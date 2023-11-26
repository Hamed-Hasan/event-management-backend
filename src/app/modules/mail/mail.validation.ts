import { z } from 'zod';

const sendMailZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    phone: z.string({
      required_error: 'Phone is required',
    }),
    source: z.string({
      required_error: 'Source is required',
    }),
    message: z.string({
      required_error: 'Message is required',
    }),
  }),
});

export const MailValidation = {
  sendMailZodSchema,
};
