import { Gender } from '@prisma/client';
import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({}).optional(),
    lastName: z.string({}).optional(),
    contactNo: z.string({}).optional(),
    profileImg: z.string({}).optional(),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]])
      .optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
