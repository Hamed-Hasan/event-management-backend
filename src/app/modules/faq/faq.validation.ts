import { z } from 'zod';

const createFaqZodSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: 'Questions is required',
    }),

    answer: z.string({
      required_error: 'Answer is required',
    }),

    userId: z.string({
      required_error: 'User Id is required',
    }),
  }),
});
const updateFaqZodSchema = z.object({
  body: z.object({
    question: z.string({}).optional(),
    answer: z.string({}).optional(),
  }),
});

export const FaqValidation = {
  createFaqZodSchema,
  updateFaqZodSchema,
};
