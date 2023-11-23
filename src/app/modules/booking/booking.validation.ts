import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    status: z
      .enum([...Object.values(BookingStatus)] as [string, ...string[]], {
        required_error: 'Status is required',
      })
      .default(BookingStatus.pending),
    startDate: z.string({
      required_error: 'Start Date is required',
    }),
    endDate: z.string({
      required_error: 'End Date is required',
    }),
    adults: z.number({
      required_error: 'Number of Adults is required',
    }),
    childrens: z.number().optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    contactNo: z.string({
      required_error: 'Contact No is required',
    }),
    totalAmount: z.number({
      required_error: 'Total Amount is required',
    }),
    daysBooked: z.number({
      required_error: 'Days Booked is required',
    }),
    userId: z.string({
      required_error: 'User id is required',
    }),
    eventId: z.string({
      required_error: 'Event id is required',
    }),
  }),
});
const updateBookingZodSchema = z.object({
  body: z.object({
    status: z
      .enum([...Object.values(BookingStatus)] as [string, ...string[]], {})
      .optional(),
    startDate: z.string({}).optional(),
    endDate: z.string({}).optional(),
    userId: z.string({}).optional(),
    eventId: z.string({}).optional(),
    adults: z.number({}).optional(),
    childrens: z.number({}).optional(),
    email: z.string({}).optional(),
    contactNo: z.string({}).optional(),
    totalAmount: z.number({}).optional(),
    daysBooked: z.number({}).optional(),
  }),
});

const confirmBookingZodSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: 'Amount is required',
    }),
    currency: z.string({
      required_error: 'Currency is required',
    }),
    paymentId: z.string({
      required_error: 'Payment Id is required',
    }),
    userId: z.string({
      required_error: 'User Id is required',
    }),
    bookingId: z.string({
      required_error: 'Booking Id is required',
    }),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
  confirmBookingZodSchema,
};
