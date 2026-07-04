const validator = require("validator");

const validateEmailRequest = (req, res, next) => {
    const { to, subject, message } = req.body;

    // Check required fields
    if (!to || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: "Recipient email, subject, and message are required."
        });
    }

    // Validate email format
    if (!validator.isEmail(to)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }

    next();
};

module.exports = validateEmailRequest;