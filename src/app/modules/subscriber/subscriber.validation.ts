import { z } from 'zod';

const addSubscriberZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),
  }),
});

const sendEmailToSubscribersZodSchema = z.object({
  body: z.object({
    subject: z.string({
      required_error: 'Subject is required',
    }),
    message: z.any({
      required_error: 'Message is required',
    }),
  }),
});

export const SubscriberValidation = {
  addSubscriberZodSchema,
  sendEmailToSubscribersZodSchema,
};
