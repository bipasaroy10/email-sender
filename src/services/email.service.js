const transporter = require("../config/mail.config");
const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger.js");

const sendEmail = async ({ to, subject, message, attachment }) => {

    const templatePath = path.join(
        __dirname,
        "../templates/welcome.html"
    );

    let htmlTemplate = fs.readFileSync(
        templatePath,
        "utf8"
    );

    htmlTemplate = htmlTemplate.replace(
        "{{MESSAGE}}",
        message
    );

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

    logger.info(
        `Email sent successfully | To: ${to} | Subject: ${subject}`
    );

    return info;

} catch (error) {

    logger.error(
        `Email failed | To: ${to} | Reason: ${error.message}`
    );

    const customError = new Error("Failed to send email.");
customError.statusCode = 500;

throw customError;
}
};

module.exports = { sendEmail };