import { BlogPost, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { blogSearchableFields } from './blog.constant';
import { IBlogFilters } from './blog.interface';

const createBlog = async (data: BlogPost): Promise<BlogPost> => {
  const result = await prisma.blogPost.create({
    data,
  });
  return result;
};

const getBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<BlogPost[]>> => {
  const { query, ...filtersData } = filters;

  const andConditions = [];

  if (query) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
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

  const whereConditions: Prisma.BlogPostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blogPost.findMany({
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
  const total = await prisma.blogPost.count({
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

const getSingleBlog = async (id: string): Promise<BlogPost | null> => {
  const result = await prisma.blogPost.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateBlog = async (
  id: string,
  data: BlogPost,
): Promise<BlogPost | null> => {
  const result = await prisma.blogPost.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<BlogPost | null> => {
  const result = await prisma.blogPost.delete({
    where: {
      id,
    },
  });
  return result;
};
const getBlogsByUser = async (userId: string): Promise<BlogPost[] | null> => {
  const result = await prisma.blogPost.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
};
