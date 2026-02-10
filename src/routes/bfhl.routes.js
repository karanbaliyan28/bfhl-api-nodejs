const router = require("express").Router();
const controller = require("../controllers/bfhl.controller");
const validate = require("../middleware/validate");
const apiKeyAuth = require("../middleware/apiKeyAuth");

router.post("/bfhl", apiKeyAuth, validate, controller.handle);

module.exports = router;
