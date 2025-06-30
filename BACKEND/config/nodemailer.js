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
    // Create a dummy transporter for testing (no logging)
    transporter = {
        sendMail: async (options) => {
            return Promise.resolve();
        }
    };
}

module.exports = transporter; 