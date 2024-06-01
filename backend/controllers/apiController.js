import nodemailer from 'nodemailer';
import { getEmailConfig } from '../data/api.js';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, orderNumber) {
  try {
    const emailConfig = getEmailConfig();
    const subject = emailConfig.subject.replace("#{orderNumber}", orderNumber);
    const text = emailConfig.text.replace("#{orderNumber}", orderNumber);
    const html = emailConfig.html.replace("#{orderNumber}", orderNumber);
    const info = await transporter.sendMail({
      from: `"Fabs Liria 👻" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
    return { messageId: info.messageId }; // Devuelve información relevante
  } catch (error) {
    console.error(error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
}

export { sendEmail };




