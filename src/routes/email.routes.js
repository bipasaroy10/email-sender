const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const validateEmailRequest = require("../middlewares/validation.middleware");

const {
    sendMail,
    verifyOtp,
    getEmailHistory
} = require("../controllers/email.controller");

// Send Email
router.post(
    "/send",
    upload.single("attachment"),
    validateEmailRequest,
    sendMail
);

// Verify OTP
router.post(
    "/verify-otp",
    verifyOtp
);

// no of emails sent
router.get(
    "/history",
    getEmailHistory
);

module.exports = router;