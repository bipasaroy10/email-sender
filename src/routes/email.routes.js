const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");

const { sendMail } = require("../controllers/email.controller");

router.post(
    "/send",
    upload.single("attachment"),
    sendMail
);

module.exports = router;