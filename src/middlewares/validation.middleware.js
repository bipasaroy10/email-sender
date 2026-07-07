const validator = require("validator");

const validateEmailRequest = (req, res, next) => {

    const {
        to,
        subject,
        message,
        template,
        link,
        name,
        amount
    } = req.body;

    if (!to) {
        return res.status(400).json({
            success: false,
            message: "Recipient email is required."
        });
    }


    if (!validator.isEmail(to)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }

    
    if (!subject) {
        return res.status(400).json({
            success: false,
            message: "Subject is required."
        });
    }

    // default template
    const selectedTemplate = template || "welcome";

    switch (selectedTemplate) {

        case "welcome":

            if (!message) {
                return res.status(400).json({
                    success: false,
                    message: "Message is required for Welcome template."
                });
            }

            break;

        

        case "password-reset":

            if (!link) {
                return res.status(400).json({
                    success: false,
                    message: "Reset link is required."
                });
            }

            break;

        case "invoice":

            if (!name || !amount) {
                return res.status(400).json({
                    success: false,
                    message: "Name and Amount are required."
                });
            }

            break;

        case "thankYou":

    if (!name || !message || !link) {

        return res.status(400).json({

            success:false,

            message:"Name, Message and Link are required."

        });

    }

    break;


        case "accountVerification":

    if (!name || !message || !link) {

        return res.status(400).json({

            success:false,

            message:"Name, Message and Verification Link are required."

        });

    }

    break;

        case "otp":

            
            break;

        default:

            return res.status(400).json({
                success: false,
                message: "Invalid template."
            });

    }

    next();
};

module.exports = validateEmailRequest;