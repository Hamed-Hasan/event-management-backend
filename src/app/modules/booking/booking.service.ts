/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Booking, BookingStatus, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import Stripe from 'stripe';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { sendMail } from '../../../shared/utils';
import {
  IBookingFilters,
  IConfirmBooking,
  IGetBookingsData,
} from './booking.interface';

const createPaymentIntents = async (data: any) => {
  const stripe = new Stripe(config.stripe.secret_key as string);
  const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
    await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      payment_method_types: ['card'],
      receipt_email: data.email,
    });

  return {
    paymentId: paymentIntent.id,
    currency: paymentIntent.currency,
    amount: paymentIntent.amount / 100,
    clientSecret: paymentIntent.client_secret,
  };
};

const createBooking = async (data: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data,
    include: {
      event: true,
      user: true,
    },
  });

  // if (result.id) {
  //   await sendMail({
  //     subject: `Booking Confirmation of - ${result.event?.title}`,
  //     to: result.email,
  //     message: `
  //     <h1>Confirmation of Your Event Booking</h1>
  //     <p> <strong>Dear ${result.user?.firstName}</strong> ,</p>
  //     <p>We are thrilled to inform you that your event booking has been successfully confirmed! Thank you for choosing GreenEcovents to be a part of your special day.</p>
  //     <h3>Event Details:</h3>
  //     <p><strong>Event Name:</strong> ${result.event?.title}</p>
  //     <p><strong>Date:</strong>: From ${result.startDate} to ${result.endDate} </p>
  //     <p><strong>Location:</strong>: ${result.event?.location}</p>
  //     <p><strong>Your Booking ID:</strong>: ${result.id}</p>
  //     <p>Please keep this email as a reference for your booking. If you have any questions or need to make any changes, don't hesitate to contact our customer support team at contact@greenecovents.com.</p>
  //     <p>We look forward to hosting you and ensuring that your event is a memorable experience. Stay tuned for further updates and information as the event date approaches.</p>
  //     <p>Best regards,</p>
  //     <p>GreenEcovents</p>
  //     `,
  //   });
  // }

  return result;
};
const confirmBooking = async (data: IConfirmBooking): Promise<Booking> => {
  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.payment.create({ data });

    const booking = await transactionClient.booking.update({
      where: {
        id: data.bookingId,
      },
      data: {
        status: BookingStatus.confirmed,
      },
      include: {
        event: true,
        user: true,
      },
    });

    return booking;
  });

  if (result.id) {
    await sendMail({
      subject: `Booking Confirmation of - ${result.event?.title}`,
      to: result.email,
      message: `
      <h1>Confirmation of Your Event Booking</h1>
      <p> <strong>Dear ${result.user?.firstName}</strong> ,</p>
      <p>We are thrilled to inform you that your event booking has been successfully confirmed! Thank you for choosing GreenEcovents to be a part of your special day.</p>
      <h3>Event Details:</h3>
      <p><strong>Event Name:</strong> ${result.event?.title}</p>
      <p><strong>Date:</strong>: From ${result.startDate} to ${result.endDate} </p>
      <p><strong>Location:</strong>: ${result.event?.location}</p>
      <p><strong>Your Booking ID:</strong>: ${result.id}</p>
      <p>Please keep this email as a reference for your booking. If you have any questions or need to make any changes, don't hesitate to contact our customer support team at contact@greenecovents.com.</p>
      <p>We look forward to hosting you and ensuring that your event is a memorable experience. Stay tuned for further updates and information as the event date approaches.</p>
      <p>Best regards,</p>
      <p>GreenEcovents</p>
      `,
    });
  }
  if (result) {
    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to confirm booking.');
};

const getBookings = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Booking[]>> => {
  const { ...filtersData } = filters;

  const andConditions = [];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        return {
          [key]: {
            equals: (filtersData as any)[key],
          },
        };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      event: {
        include: {
          categories: true,
          reviews: true,
        },
      },
    },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getBookingsByUser = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions,
  user: JwtPayload | null,
): Promise<IGenericResponse<Booking[]>> => {
  const { ...filtersData } = filters;

  const andConditions = [];

  andConditions.push({
    AND: {
      userId: user?.id,
    },
  });
  // andConditions.push({
  //   OR: [
  //     {
  //       status: BookingStatus.pending,
  //     },
  //     {
  //       status: BookingStatus.confirmed,
  //     },
  //   ],
  // });

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        return {
          [key]: {
            equals: (filtersData as any)[key],
          },
        };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // @ts-ignore
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      event: {
        include: {
          categories: true,
          reviews: true,
        },
      },
      payments: true,
    },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      event: {
        include: {
          categories: true,
          reviews: true,
        },
      },
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  data: Booking,
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
      event: {
        include: {
          categories: true,
          reviews: true,
        },
      },
    },
  });

  if (data.status && result.id) {
    if (
      data.status === BookingStatus.confirmed ||
      data.status === BookingStatus.pending
    ) {
      await sendMail({
        subject: `Booking Status Update of - ${result.event?.title}`,
        to: result.email,
        message: `
      <h1>Booking Status Update of - ${result.event?.title}</h1>
      <p> <strong>Dear ${result.user?.firstName}</strong> ,</p>
      <p>We are writing to inform you that the status of your event booking has been updated to <strong>${result.status}</strong>! Thank you for choosing GreenEcovents to be a part of your special day.</p>
      <h3>Event Details:</h3>
      <p><strong>Event Name:</strong> ${result.event?.title}</p>
      <p><strong>Booking Status:</strong> ${result?.status}</p>
      <p><strong>Date:</strong>: From ${result.startDate} to ${result.endDate} </p>
      <p><strong>Location:</strong>: ${result.event?.location}</p>
      <p><strong>Your Booking ID:</strong>: ${result.id}</p>
      <p>Please keep this email as a reference for your booking. If you have any questions or need to make any changes, don't hesitate to contact our customer support team at contact@greenecovents.com </p>
      <p>Best regards,</p>
      <p>GreenEcovents</p>
      `,
      });
    } else if (data.status === BookingStatus.canceled) {
      await sendMail({
        subject: `Booking Cancellation of - ${result.event?.title}`,
        to: result.email,
        message: `
      <h1>Cancellation of Your Event Booking</h1>
      <p> <strong>Dear ${result.user?.firstName}</strong> ,</p>
      <p>We are sorry to inform you that your event booking has been cancelled! Thank you for choosing GreenEcovents to be a part of your special day.</p>
      <h3>Event Details:</h3>
      <p><strong>Event Name:</strong> ${result.event?.title}</p>
      <p><strong>Date:</strong>: From ${result.startDate} to ${result.endDate} </p>
      <p><strong>Location:</strong>: ${result.event?.location}</p>
      <p><strong>Your Booking ID:</strong>: ${result.id}</p>
      <p>Please keep this email as a reference for your booking. If you have any questions or need to make any changes, don't hesitate to contact our customer support team at contact@greenecovents.com</p>
      <p>Best regards,</p>
      <p>GreenEcovents</p>
      `,
      });
    }
  }

  return result;
};
const cancelBooking = async (
  id: string,
  user: JwtPayload | null,
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      status: BookingStatus.canceled,
    },
    include: {
      user: true,
      event: {
        include: {
          categories: true,
          reviews: true,
        },
      },
    },
  });

  if (result.id) {
    await sendMail({
      subject: `Booking Cancellation of - ${result.event?.title}`,
      to: result.email,
      message: `
      <h1>Cancellation of Your Event Booking</h1>
      <p> <strong>Dear ${result.user?.firstName}</strong> ,</p>
      <p>We are sorry to inform you that your event booking has been cancelled! Thank you for choosing GreenEcovents to be a part of your special day.</p>
      <h3>Event Details:</h3>
      <p><strong>Event Name:</strong> ${result.event?.title}</p>
      <p><strong>Date:</strong>: From ${result.startDate} to ${result.endDate} </p>
      <p><strong>Location:</strong>: ${result.event?.location}</p>
      <p><strong>Your Booking ID:</strong>: ${result.id}</p>
      <p>Please keep this email as a reference for your booking. If you have any questions or need to make any changes, don't hesitate to contact our customer support team at contact@greenecovents.com</p>
      <p>Best regards,</p>
      <p>GreenEcovents</p>
      `,
    });
  }

  return result;
};

const deleteBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isBookingExist = await transactionClient.booking.findUnique({
      where: {
        id,
      },
      include: {
        payments: true,
      },
    });

    if (!isBookingExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The booking does not exist.');
    }

    // delete payments by id
    await transactionClient.payment.deleteMany({
      where: {
        bookingId: isBookingExist.id,
      },
    });

    const booking = await transactionClient.booking.delete({
      where: {
        id: isBookingExist.id,
      },
    });

    return booking;
  });
  if (result) {
    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to delete booking');
};

const getPaymentDetails = async (paymentIntentId: string) => {
  if (!paymentIntentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment id.');
  }
  const stripe = new Stripe(config.stripe.secret_key as string);
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const { id, amount, currency, receipt_email } = paymentIntent;

  const result = await prisma.payment.findFirst({
    where: {
      paymentId: paymentIntentId,
    },
    include: {
      user: true,
    },
  });

  const paymentDetails = {
    paymentId: id,
    amount: result?.amount || amount / 100,
    currency,
    email: receipt_email,
    name: result?.user?.firstName + ' ' + result?.user?.lastName,
    bookingId: result?.bookingId,
  };
  return paymentDetails;
};
const getBookingsData = async (
  // timeRange: ITimeRange,
  // year?: number,
  data: IGetBookingsData,
) => {
  const { timeRange, year } = data;

  const now = new Date();
  let startDate = now;
  if (timeRange === 'today') {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (timeRange === '7days') {
    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (timeRange === '1month') {
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  } else if (timeRange === 'year') {
    startDate = new Date(year || now.getFullYear(), 0, 1);
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (timeRange === 'today') {
    const hourlyData = [];
    for (let hour = 0; hour < 24; hour++) {
      const whereClause: Prisma.BookingWhereInput = {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour),
          lt: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour + 1,
          ),
        },
      };

      const bookings = await prisma.booking.findMany({
        where: whereClause,
        include: {
          payments: true,
        },
      });

      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce(
        (sum, booking) =>
          sum +
          booking.payments.reduce(
            (paymentSum, payment) => paymentSum + payment.amount,
            0,
          ),
        0,
      );

      hourlyData.push({
        label: `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'AM' : 'PM'}`,
        totalBookings,
        totalRevenue,
      });
    }

    return hourlyData;
  } else if (timeRange === 'year') {
    const monthlyData = [];
    for (let month = 0; month < 12; month++) {
      const whereClause: Prisma.BookingWhereInput = {
        createdAt: {
          gte: new Date(year || now.getFullYear(), month, 1),
          lt: new Date(year || now.getFullYear(), month + 1, 1),
        },
      };

      const bookings = await prisma.booking.findMany({
        where: whereClause,
        include: {
          payments: true,
        },
      });

      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce(
        (sum, booking) =>
          sum +
          booking.payments.reduce(
            (paymentSum, payment) => paymentSum + payment.amount,
            0,
          ),
        0,
      );

      monthlyData.push({
        label: monthNames[month],
        totalBookings,
        totalRevenue,
      });
    }

    return monthlyData;
  } else {
    const dailyData = [];
    for (let date = startDate; date <= now; date.setDate(date.getDate() + 1)) {
      const whereClause: Prisma.BookingWhereInput = {
        createdAt: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      };

      const bookings = await prisma.booking.findMany({
        where: whereClause,
        include: {
          payments: true,
        },
      });

      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce(
        (sum, booking) =>
          sum +
          booking.payments.reduce(
            (paymentSum, payment) => paymentSum + payment.amount,
            0,
          ),
        0,
      );

      dailyData.push({
        label: `${dayNames[date.getDay()]}, ${date.getDate()} ${
          monthNames[date.getMonth()]
        }`,
        totalBookings,
        totalRevenue,
      });
    }

    return dailyData;
  }
};

export const BookingService = {
  createPaymentIntents,
  createBooking,
  confirmBooking,
  getPaymentDetails,
  getBookings,
  getBookingsByUser,
  getSingleBooking,
  updateBooking,
  cancelBooking,
  deleteBooking,
  getBookingsData,
};
