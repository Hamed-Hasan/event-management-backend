import { Gender, UserRole } from '@prisma/client';
import { z } from 'zod';

const signupZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email address is required',
      })
      .email({
        message: 'Use valid email address',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]], {
        required_error: 'User role is required',
      })
      .default(UserRole.USER),
    gender: z.enum([...Object.values(Gender)] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email address is required',
      })
      .email({
        message: 'Use valid email address',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});
export const AuthValidation = {
  signupZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
