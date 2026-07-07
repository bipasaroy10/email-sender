const transporter = require("../config/mail.config.js");
const Email = require("../models/email.model.js");
const logger = require("../utils/logger.js");

const fs = require("fs");
const path = require("path");

const sendEmail = async ({
    to,
    subject,
    message,
    template = "welcome",
    otp,
    link,
    name,
    amount,
    attachment
}) => {

    const templatePath = path.join(
        __dirname,
        `../templates/${template}.html`
    );

    if (!fs.existsSync(templatePath)) {
        const error = new Error(`Template '${template}' not found.`);
        error.statusCode = 404;
        throw error;
    }

    let htmlTemplate = fs.readFileSync(
        templatePath,
        "utf8"
    );

    htmlTemplate = htmlTemplate
        .replace(/{{MESSAGE}}/g, message || "")
        .replace(/{{OTP}}/g, otp || "")
        .replace(/{{LINK}}/g, link || "")
        .replace(/{{NAME}}/g, name || "")
        .replace(/{{AMOUNT}}/g, amount || "");

    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlTemplate,
        attachments: attachment
            ? [
                {
                    filename: attachment.originalname,
                    path: attachment.path
                }
            ]
            : []
    };

    try {

        const info = await transporter.sendMail(mailOptions);

        
        await Email.create({
            to,
            subject,
            message,
            attachment: attachment
                ? attachment.originalname
                : null,
            status: "SUCCESS"
        });

        
        logger.info(
            `Email sent successfully | To: ${to} | Subject: ${subject}`
        );

        return info;

    } catch (error) {

        
        await Email.create({
            to,
            subject,
            message,
            attachment: attachment
                ? attachment.originalname
                : null,
            status: "FAILED",
            error: error.message
        });

        
        logger.error(
            `Email failed | To: ${to} | Reason: ${error.message}`
        );

        const customError = new Error("Failed to send email.");
        customError.statusCode = 500;

        throw customError;
    }
};

module.exports = {
    sendEmail
};