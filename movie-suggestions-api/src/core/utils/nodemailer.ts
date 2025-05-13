import nodemailer from 'nodemailer';
import { ENV } from '../../config/env';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASS,
  },
});

export async function mailSend({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
}) {
  
  await transporter.sendMail({
    from: ENV.EMAIL,
    to: email,
    subject,
    html,
  });
}
