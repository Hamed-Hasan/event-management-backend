import { Pages, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IPageFilters } from './page.interface';
import { pageSearchableFields } from './page.constant';

const createPage = async (data: Pages): Promise<Pages> => {
  const result = await prisma.pages.create({
    data,
  });
  return result;
};

const getPages = async (
  filters: IPageFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Pages[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: pageSearchableFields.map(field => ({
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

  const whereConditions: Prisma.PagesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.pages.findMany({
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
  const total = await prisma.pages.count({
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

const getSinglePage = async (id: string): Promise<Pages | null> => {
  const result = await prisma.pages.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updatePage = async (id: string, data: Pages): Promise<Pages | null> => {
  const result = await prisma.pages.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deletePage = async (id: string): Promise<Pages | null> => {
  const result = await prisma.pages.delete({
    where: {
      id,
    },
  });
  return result;
};
const getPagesByUser = async (userId: string): Promise<Pages[] | null> => {
  const result = await prisma.pages.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const PageService = {
  createPage,
  getPages,
  getSinglePage,
  updatePage,
  deletePage,
  getPagesByUser,
};
