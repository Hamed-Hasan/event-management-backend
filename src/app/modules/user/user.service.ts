import { Prisma, User, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { excludePassword } from '../../../shared/utils';
import { IUserFilters } from './user.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const getProfile = async (
  user: JwtPayload | null,
): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (result?.email) {
    const newResult = excludePassword(result, ['password']);

    return newResult;
  }
  return null;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
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
      blogPosts: true,
      FAQs: true,
      events: true,
    },
  });
  const total = await prisma.user.count();

  const newResult = [];

  for (let i = 0; i < result.length; i++) {
    const user = result[i];
    const excludedUser = excludePassword(user, ['password']);
    newResult.push(excludedUser);
  }

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: newResult,
  };
};

const getUserById = async (userId: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (result?.email) {
    const newResult = excludePassword(result, ['password']);

    return newResult;
  }
  return null;
};

const updateProfile = async (
  user: JwtPayload | null,
  data: Partial<User>,
): Promise<Partial<User> | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data,
  });

  if (result?.email) {
    const newResult = excludePassword(result, ['password']);

    return newResult;
  }
  return null;
};
const updateUser = async (
  userId: string,
  data: Partial<User>,
): Promise<Partial<User> | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

  if (result?.email) {
    const newResult = excludePassword(result, ['password']);

    return newResult;
  }
  return null;
};

const deleteUser = async (userId: string): Promise<User | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isUserExist = await transactionClient.user.findUnique({
      where: {
        id: userId,
        role: UserRole.USER,
      },
      include: {
        bookings: true,
        reviews: true,
      },
    });

    if (!isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The user does not exist.');
    }

    // delete bookings by the user
    await transactionClient.booking.deleteMany({
      where: {
        userId: isUserExist.id,
      },
    });

    // delete reviews by the user
    await transactionClient.review.deleteMany({
      where: {
        userId: isUserExist.id,
      },
    });
    // delete feedback by the user
    await transactionClient.feedback.deleteMany({
      where: {
        userId: isUserExist.id,
      },
    });

    const user = await transactionClient.user.delete({
      where: {
        id: isUserExist.id,
      },
    });

    return user;
  });
  if (result) {
    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to delete user');
};

export const UserService = {
  getProfile,
  getAllUsers,
  getUserById,
  updateProfile,
  updateUser,
  deleteUser,
};
