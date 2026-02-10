process.env.OFFICIAL_EMAIL = "test@example.com";
process.env.API_KEY = "test-api-key";
process.env.GEMINI_API_KEY = "";

const validate = require("../src/middleware/validate");
const apiKeyAuth = require("../src/middleware/apiKeyAuth");
const errorHandler = require("../src/middleware/errorHandler");
const bfhlController = require("../src/controllers/bfhl.controller");
const healthController = require("../src/controllers/health.controller");
const math = require("../src/utils/math");

const mockRes = () => {
 const res = {};
 res.statusCode = 200;
 res.body = null;
 res.status = jest.fn((code) => {
  res.statusCode = code;
  return res;
 });
 res.json = jest.fn((payload) => {
  res.body = payload;
  return res;
 });
 return res;
};

describe("health.controller", () => {
 test("returns success payload", () => {
  const req = {};
  const res = mockRes();

  healthController.check(req, res);

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({
   is_success: true,
   official_email: "test@example.com"
  });
 });
});

describe("validate middleware", () => {
 test("calls next for valid fibonacci payload", () => {
  const req = { body: { fibonacci: 5 } };
  const res = mockRes();
  const next = jest.fn();

  validate(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
 });

 test("rejects payload with multiple keys", () => {
  const req = { body: { fibonacci: 5, prime: [2, 3] } };
  const res = mockRes();
  const next = jest.fn();

  validate(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Send exactly one key");
 });

 test("rejects unsupported key", () => {
  const req = { body: { random: 10 } };
  const res = mockRes();
  const next = jest.fn();

  validate(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(400);
 });

 test("rejects invalid AI prompt", () => {
  const req = { body: { AI: "   " } };
  const res = mockRes();
  const next = jest.fn();

  validate(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("AI expects a non-empty string prompt");
 });
});

describe("apiKeyAuth middleware", () => {
 test("rejects when x-api-key is missing", () => {
  const req = { headers: {} };
  const res = mockRes();
  const next = jest.fn();

  apiKeyAuth(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(401);
  expect(res.body.error).toBe("Unauthorized");
 });

 test("allows valid x-api-key", () => {
  const req = { headers: { "x-api-key": "test-api-key" } };
  const res = mockRes();
  const next = jest.fn();

  apiKeyAuth(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
 });
});

describe("math utils", () => {
 test("fibonacci returns expected sequence", () => {
  expect(math.fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
 });

 test("primes returns unique prime numbers", () => {
  expect(math.primes([2, 3, 3, 4, 5, 11])).toEqual([2, 3, 5, 11]);
 });

 test("hcfArray returns HCF", () => {
  expect(math.hcfArray([12, 18, 24])).toBe(6);
 });

 test("lcmArray returns LCM", () => {
  expect(math.lcmArray([4, 6, 8])).toBe(24);
 });

 test("lcmArray handles zero safely", () => {
  expect(math.lcmArray([0, 6])).toBe(0);
 });
});

describe("bfhl.controller", () => {
 test("returns computed result for fibonacci", async () => {
  const req = { body: { fibonacci: 5 } };
  const res = mockRes();
  const next = jest.fn();

  await bfhlController.handle(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(200);
  expect(res.body.data).toEqual([0, 1, 1, 2, 3]);
 });
});

describe("errorHandler middleware", () => {
 test("returns custom 400 error message", () => {
  const err = new Error("Bad request");
  err.statusCode = 400;

  const req = {};
  const res = mockRes();
  const next = jest.fn();

  errorHandler(err, req, res, next);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Bad request");
 });
});
