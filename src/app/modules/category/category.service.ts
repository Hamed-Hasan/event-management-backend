import { Category, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICategoryFilters } from './category.interface';
import { IGenericResponse } from '../../../interfaces/common';
import { categorySearchableFields } from './category.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
    include: { events: true },
  });
  return result;
};

const getCategories = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Category[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
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

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
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
    include: { events: true },
  });
  const total = await prisma.category.count({
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

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: { events: true },
  });
  return result;
};

const updateCategory = async (
  id: string,
  data: Category,
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
    include: { events: true },
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isCategoryExist = await transactionClient.category.findUnique({
      where: {
        id,
      },
      include: {
        events: true,
      },
    });

    if (!isCategoryExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'The category does not exist.',
      );
    }

    // delete events by the category
    await transactionClient.event.deleteMany({
      where: {
        categoryId: isCategoryExist.id,
      },
    });

    const category = await transactionClient.category.delete({
      where: {
        id: isCategoryExist.id,
      },
    });

    return category;
  });
  if (result) {
    return result;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to delete category');
};

export const CategoryService = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
