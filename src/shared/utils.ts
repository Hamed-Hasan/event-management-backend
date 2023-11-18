import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getTransporter } from './transporter';
import config from '../config';

export const isPasswordMatch = async (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const excludePassword = (
  user: User,
  keys: string[],
): Omit<User, string> => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
};

export const asyncForEach = async (array: any, callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

type ISendMail = {
  message: string;
  subject: string;
  to: string | string[];
};

export const sendMail = async (
  data: ISendMail,
): Promise<
  | {
      sent: boolean;
    }
  | undefined
> => {
  const transporter = getTransporter();

  const mailOptions = {
    from: config.email.user,
    to: data.to,
    subject: data.subject,
    html: data.message,
  };

  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    throw new Error('Email not sent');
  }
  if (info.messageId) {
    return { sent: true };
  }
};
