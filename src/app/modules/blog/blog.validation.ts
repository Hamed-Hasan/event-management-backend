import { z } from 'zod';

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Blog name is required',
    }),
    content: z.any({
      required_error: 'Content is required',
    }),
    userId: z.string({
      required_error: 'User Id is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});
const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    content: z.any().optional(),
    image: z.string({}).optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
