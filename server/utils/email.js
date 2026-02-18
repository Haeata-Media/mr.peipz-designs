const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: 'Mr. Peipz <onboarding@resend.dev>', // Update this with verified domain later
      to: [to],
      subject: subject,
      html: html,
    });
    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    return null;
  }
};

module.exports = {
  sendEmail,
};
