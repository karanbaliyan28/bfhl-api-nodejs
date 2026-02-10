const router = require("express").Router();
const controller = require("../controllers/bfhl.controller");
const validate = require("../middleware/validate");


router.post("/bfhl", validate, controller.handle);

module.exports = router;
