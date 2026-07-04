const { sendEmail } = require("../services/email.service");

const sendMail = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        // Validation
        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        await sendEmail({ to, subject, message });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email.",
            error: error.message
        });
    }
};

module.exports = { sendMail };