const express = require("express");
const cors = require("cors");
require("dotenv").config();

const emailRoutes = require("./routes/email.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Email Sender API is running."
    });
});

app.use("/api/email", emailRoutes);

module.exports = app;