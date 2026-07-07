const { sendEmail } = require("../services/email.service.js");
const Email = require("../models/email.model.js");
const Otp = require("../models/otp.model.js");
const { generateOTP } = require("../utils/otp.util.js");

// Send Email
const sendMail = async (req, res, next) => {
    try {

        const {
            to,
            subject,
            message,
            template = "welcome",
            link,
            name,
            amount
        } = req.body;

        const attachment = req.file;

        let otp = null;

        // otp generation
        if (template === "otp") {

            otp = generateOTP(6);

            const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

            // Delete previous unverified OTPs
            await Otp.deleteMany({
                email: to,
                verified: false
            });

            // Save new OTP
            await Otp.create({
                email: to,
                otp,
                expiresAt
            });

        }

        await sendEmail({
            to,
            subject,
            message,
            template,
            otp,
            link,
            name,
            amount,
            attachment
        });

        return res.status(200).json({
            success: true,
            message:
                template === "otp"
                    ? "OTP sent successfully."
                    : "Email sent successfully."
        });

    } catch (error) {
        next(error);
    }
};
// Verify OTP
const verifyOtp = async (req, res, next) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required."
            });
        }

        const otpRecord = await Otp.findOne({
            email,
            otp,
            verified: false
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP."
            });
        }

        if (otpRecord.expiresAt < new Date()) {

            return res.status(400).json({
                success: false,
                message: "OTP has expired."
            });

        }

        otpRecord.verified = true;

        await otpRecord.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully."
        });

    } catch (error) {
        next(error);
    }

};

// Email History
const getEmailHistory = async (req, res, next) => {

    try {

        const emails = await Email.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: emails.length,
            data: emails
        });

    } catch (error) {
        next(error);
    }

};

module.exports = {
    sendMail,
    verifyOtp,
    getEmailHistory
};