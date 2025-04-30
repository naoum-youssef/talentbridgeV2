// server/utils/emailService.js

const nodemailer = require('nodemailer');

// Create transporter using SMTP (configure via environment variables)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email using nodemailer
 * @param {Object} options
 * @param {string} options.to - Recipient's email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body (optional)
 * @param {string} options.html - HTML body (optional)
 * @param {string} [options.from] - Sender's email address (optional)
 * @returns {Promise<Object>} - nodemailer response info
 */
async function sendEmail({ to, subject, text, html, from }) {
  const mailOptions = {
    from: from || process.env.EMAIL_FROM, // Default sender from env
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};