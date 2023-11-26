import { z } from 'zod';

const createPageZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Page name is required',
    }),
    content: z.any({
      required_error: 'Content is required',
    }),
    userId: z.string({
      required_error: 'User Id is required',
    }),
  }),
});
const updatePageZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    content: z.any().optional(),
    image: z.string({}).optional(),
  }),
});

export const PageValidation = {
  createPageZodSchema,
  updatePageZodSchema,
};
