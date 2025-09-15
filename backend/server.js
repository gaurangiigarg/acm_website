// server.js

// 1. Import required packages
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // To use environment variables from a .env file

// 2. Set up the Express app
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to understand JSON data

// 3. Create the email sending "transporter"
// This uses your email credentials to connect to your email provider
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env file
        pass: process.env.EMAIL_PASS, // Your email's "App Password" from .env file
    },
});

// 4. Create the API endpoint
app.post('/send-email', (req, res) => {
    // Get the form data from the request body
    const { name, email, message } = req.body;

    // Set up the email content
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: process.env.EMAIL_USER,    // The email address where you want to receive messages
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // 5. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// 6. Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});