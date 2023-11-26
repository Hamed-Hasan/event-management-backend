import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .max(5)
      .min(1),
    userId: z.string({
      required_error: 'User Id is required',
    }),
    eventId: z.string({
      required_error: 'Event Id is required',
    }),
  }),
});
const updateReviewZodSchema = z.object({
  body: z.object({
    review: z.string({}).optional(),
    rating: z.number({}).max(5).min(1).optional(),
    userId: z.string({}).optional(),
    eventId: z.string({}).optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
