import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    feedback: z.string({
      required_error: 'Feedback is required',
    }),

    userId: z.string({
      required_error: 'User Id is required',
    }),
  }),
});
const updateFeedbackZodSchema = z.object({
  body: z.object({
    feedback: z.string({}).optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema,
};
