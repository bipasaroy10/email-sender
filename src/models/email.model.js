const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({

    to: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String
    },

    attachment: {
        type: String,
        default: null
    },

    status: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        required: true
    },

    error: {
        type: String,
        default: null
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Email", emailSchema);