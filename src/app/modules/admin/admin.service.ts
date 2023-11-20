import { Prisma, User, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach, excludePassword } from '../../../shared/utils';
import { adminSearchableFields } from './admin.constant';
import { IAdminFilters, IMakeAdmin, MakeAdminInfo } from './admin.interface';

const getAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  andConditions.push({
    AND: {
      role: UserRole.ADMIN,
    },
  });

  if (query) {
    andConditions.push({
      OR: adminSearchableFields.map(field => ({
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
  const total = await prisma.user.count({
    where: whereConditions,
  });

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

const makeAdmin = async (data: IMakeAdmin): Promise<void> => {
  try {
    if (data?.users.length) {
      await prisma.$transaction(async transactionClient => {
        await asyncForEach(data?.users, async (user: MakeAdminInfo) => {
          const isUserExist = await transactionClient.user.findUnique({
            where: {
              email: user.email,
            },
          });

          if (!isUserExist) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              'The user does not exist, to make admin, you must register first.',
            );
          }

          const makeAdmin = await transactionClient.user.update({
            where: {
              email: user.email,
            },
            data: {
              role: UserRole.ADMIN,
            },
          });
          return makeAdmin;
        });
      });
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to make admin');
  }

  // const { userId } = data;
  // const result = await prisma.$transaction(async transactionClient => {
  //   const isUserExist = await transactionClient.user.findUnique({
  //     where: {
  //       id: userId,
  //       role: UserRole.USER,
  //     },
  //   });
  //   if (!isUserExist) {
  //     throw new ApiError(
  //       httpStatus.BAD_REQUEST,
  //       'The user does not exist, to make admin, you must register first.',
  //     );
  //   }
  //   const makeAdmin = await transactionClient.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       role: UserRole.ADMIN,
  //     },
  //   });
  //   return makeAdmin;
  // });
  // if (result) {
  //   const newResult = excludePassword(result, ['password']);
  //   return newResult;
  // }
  // throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to make admin');
};
const deleteAdmin = async (userId: string): Promise<User | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isUserExist = await transactionClient.user.findUnique({
      where: {
        id: userId,
        role: UserRole.ADMIN,
      },
      include: {
        blogPosts: true,
        events: true,
        FAQs: true,
      },
    });

    if (!isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The user does not exist.');
    }

    await transactionClient.event.deleteMany({
      where: {
        userId: isUserExist.id,
      },
    });

    await transactionClient.blogPost.deleteMany({
      where: {
        userId: isUserExist.id,
      },
    });
    // delete faqs by the user
    await transactionClient.fAQ.deleteMany({
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

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to delete admin');
};
const updateAdmin = async (
  userId: string,
  data: Partial<User>,
): Promise<Partial<User> | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
      role: UserRole.ADMIN,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The user does not exist.');
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
      role: UserRole.ADMIN,
    },
    data,
  });

  const newResult = excludePassword(result, ['password']);

  return newResult;
};

export const AdminService = {
  getAdmins,
  makeAdmin,
  deleteAdmin,
  updateAdmin,
};
