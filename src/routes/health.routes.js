const router = require("express").Router();
const controller = require("../controllers/health.controller");

router.get("/health", controller.check);

module.exports = router;
