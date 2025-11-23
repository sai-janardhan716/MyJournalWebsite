const mailer = require("nodemailer");
require("dotenv").config();
const transporter = mailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        password : process.env.MAILER_PASSWORD
    }
});

async function sendWelcomeEmail(toEmail, name) {
    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Welcome to MyJournal App!",
        html: `
            <h2>Hello ${name},</h2>
            <p>Welcome to <b>My Journal App</b>. Your account has been created successfully.</p>
            <p>Start writing your journal entries and track your daily thoughts.</p>
            <hr>
            <small>Thank you for joining us!</small>
        `
    });
}
module.exports = {sendWelcomeEmail};