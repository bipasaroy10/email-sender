# Email Sender API

 Email Sender application developed using **Node.js**, **Express.js**, **MongoDB**, and **Nodemailer**.

This project allows users to send emails through **Gmail SMTP** using multiple professionally designed HTML templates. It also supports **file attachments**, **OTP generation and verification**, **email history management**, **logging**, **input validation**, and **global error handling**.


# 📌 Project Objective

- Send emails using Gmail SMTP
- Send emails with html templates
- Send emails with file attachments
- Generate and verify OTPs
- Store email history in MongoDB
- Validate user input
- Handle application errors properly
- Maintain logs of successful and failed emails


Supports sending:

- PDF
- DOC
- DOCX
- PNG
- JPG
- JPEG

using multipart/form-data.


## 📜 Logging

Implemented using Winston.

Logs include:

- Email sent successfully
- Email sending failed
- Error messages
- Timestamp

## ✅ Input Validation

Implemented using Validator.js.

Validation includes:

- Valid email address
- Required fields
- Template-specific validation
- Invalid template detection

---

## ⚠ Error Handling

Global Error Middleware handles

- Invalid requests
- SMTP errors
- Database errors
- Template errors
- Internal server errors

---

##  Additional Features

- MongoDB Email History
- Dynamic HTML Templates
- REST API Architecture

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Email Service

- Nodemailer
- Gmail SMTP

## File Upload

- Multer

## Validation

- Validator.js

## Logging

- Winston

## Environment Variables

- dotenv

## Development Tools

- Nodemon
- Postman
- Git
- GitHub

---

# 📁 Folder Structure

```
email-sender/

│

├── src/

│   ├── config/
│   │      mail.config.js
│   │
│   ├── controllers/
│   │      email.controller.js
│   │
│   ├── middlewares/
│   │      validation.middleware.js
│   │      upload.middleware.js
│   │      error.middleware.js
│   │
│   ├── models/
│   │      email.model.js
│   │      otp.model.js
│   │
│   ├── routes/
│   │      email.routes.js
│   │
│   ├── services/
│   │      email.service.js
│   │
│   ├── templates/
│   │      welcome.html
│   │      otp.html
│   │      password-reset.html
│   │      invoice.html
│   │      thankYou.html
│   │      accountVerification.html
│   │
│   ├── uploads/
│   │
│   ├── logs/
│   │      email.log
│   │
│   ├── utils/
│   │      logger.js
│   │      otp.util.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
├── README.md



| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/api/email/send`       | Send email using Gmail SMTP |
| POST   | `/api/email/verify-otp` | Verify generated OTP        |
| GET    | `/api/email/history`    | Get all email history       |

