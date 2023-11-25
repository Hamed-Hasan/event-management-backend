import { z } from 'zod';

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Event name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    startDate: z.string({
      required_error: 'Start Date is required',
    }),
    endDate: z.string({
      required_error: 'End Date is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    userId: z.string({
      required_error: 'User Id is required',
    }),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});
const updateEventZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    description: z.string({}).optional(),
    startDate: z.string({}).optional(),
    endDate: z.string({}).optional(),
    location: z.string({}).optional(),
    price: z.number({}).optional(),
    image: z.string({}).optional(),
    userId: z.string({}).optional(),
    categoryId: z.string({}).optional(),
  }),
});

export const EventValidation = {
  createEventZodSchema,
  updateEventZodSchema,
};
