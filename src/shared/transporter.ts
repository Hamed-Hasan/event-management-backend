import nodemailer from 'nodemailer';
import config from '../config';

export const getTransporter = (): nodemailer.Transporter => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
};
