const { sendEmail } = require("../services/email.service");

const sendMail = async (req, res, next) => {
    try {
        const { to, subject, message } = req.body;

        const attachment = req.file;

        

        await sendEmail({ to, subject, message, attachment });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully."
        });

    } catch (error) {
    next(error);
}
};

module.exports = { sendMail };