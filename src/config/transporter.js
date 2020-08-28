import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.SMPT_EMAIL,
    clientId: process.env.SMTP_CLIENT_ID,
    clientSecret: process.env.SMTP_CLIENT_SECRET,
    refreshToken: process.env.SMTP_REFRESH_TOKEN,
    accessToken: process.env.SMTP_ACCESS_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error)
    console.log(error);
  else
    console.log('Server is ready to take our messages', success);
});

export default transporter;
