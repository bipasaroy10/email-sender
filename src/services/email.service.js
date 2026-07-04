const transporter = require("../config/mail.config");
const fs = require("fs");
const path = require("path");

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

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };