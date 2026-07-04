const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware.js");

const { sendMail } = require("../controllers/email.controller.js");

const validateEmailRequest = require("../middlewares/validation.middleware.js");

router.post(
    "/send",
    validateEmailRequest,
    upload.single("attachment"),
    sendMail
);

module.exports = router;