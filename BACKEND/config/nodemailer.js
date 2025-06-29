const nodemailer = require('nodemailer');

let transporter;

// Only create transporter if email credentials are available
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
} else {
    console.log('Email configuration not found. OTP will be logged to console for testing.');
    // Create a dummy transporter for testing
    transporter = {
        sendMail: async (options) => {
            console.log('Email would be sent:', options);
            return Promise.resolve();
        }
    };
}

module.exports = transporter; 