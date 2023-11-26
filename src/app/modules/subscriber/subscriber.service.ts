import { Prisma, Subscriber } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  ISendEmailToSubscribers,
  ISubscriberFilters,
} from './subscriber.interface';
import { subscriberSearchableFields } from './subscriber.constant';
import { sendMail } from '../../../shared/utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const addSubscriber = async (data: Subscriber): Promise<Subscriber> => {
  const result = await prisma.subscriber.create({
    data,
  });
  return result;
};

const getSubscribers = async (
  filters: ISubscriberFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Subscriber[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: subscriberSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SubscriberWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.subscriber.findMany({
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
  });
  const total = await prisma.subscriber.count({
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

const sendEmailToSubscribers = async (data: ISendEmailToSubscribers) => {
  const subscribers = await prisma.subscriber.findMany();

  if (subscribers.length) {
    const result = await sendMail({
      to: subscribers.map(subscriber => subscriber.email),
      subject: data.subject,
      message: data.message,
    });
    if (!result?.sent) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Email not sent!');
    }
  }
};

const deleteSubscriber = async (id: string): Promise<Subscriber | null> => {
  const result = await prisma.subscriber.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SubscriberService = {
  addSubscriber,
  getSubscribers,
  sendEmailToSubscribers,
  deleteSubscriber,
};
