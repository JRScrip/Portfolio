const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML and CSS)
app.use(express.static('public'));

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail or another email service
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password or app password
        },
    });

    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: 'your-email@gmail.com', // Recipient address (can be the same as sender)
        subject: `New Message from ${name}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending message.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});