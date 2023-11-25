import { Event, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { eventSearchableFields } from './event.constant';
import { IEventFilters } from './event.interface';

const createEvent = async (data: Event): Promise<Event> => {
  const result = await prisma.event.create({
    data,
    include: {
      bookings: true,
      categories: true,
      reviews: true,
    },
  });
  return result;
};

const getEvents = async (
  filters: IEventFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Event[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: eventSearchableFields.map(field => ({
        [field]: {
          contains: query,
          mode: 'insensitive',
        },
      })),
    });
  }

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

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.event.findMany({
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
      bookings: true,
      categories: true,
      reviews: true,
    },
  });
  const total = await prisma.event.count({
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

const getSingleEvent = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      bookings: true,
      categories: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};

const updateEvent = async (id: string, data: Event): Promise<Event | null> => {
  const result = await prisma.event.update({
    where: {
      id,
    },
    data,
    include: {
      bookings: true,
      categories: true,
      reviews: true,
    },
  });
  return result;
};

const deleteEvent = async (id: string): Promise<Event | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isEventExist = await transactionClient.event.findUnique({
      where: {
        id,
      },
      include: {
        bookings: true,
        reviews: true,
      },
    });

    if (!isEventExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The event does not exist.');
    }

    // delete bookings by the category
    await transactionClient.booking.deleteMany({
      where: {
        eventId: isEventExist.id,
      },
    });
    // delete reviews by the category
    await transactionClient.review.deleteMany({
      where: {
        eventId: isEventExist.id,
      },
    });

    const event = await transactionClient.event.delete({
      where: {
        id: isEventExist.id,
      },
    });

    return event;
  });
  if (result) {
    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to delete event');
};

export const EventService = {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
