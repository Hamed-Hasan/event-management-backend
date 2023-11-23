import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BlogPost } from '@prisma/client';
import { blogFilterableFields } from './blog.constant';
import { BlogService } from './blog.service';

const createBlogController = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);

  sendResponse<BlogPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});
const getBlogsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getBlogs(filters, paginationOptions);

  sendResponse<BlogPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleBlogController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BlogService.getSingleBlog(req.params.id);

    sendResponse<BlogPost | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog retrieved successfully!',
      data: result,
    });
  },
);

const updateBlogController = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);

  sendResponse<BlogPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const deleteBlogController = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);

  sendResponse<BlogPost | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully!',
    data: result,
  });
});
const getBlogsByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await BlogService.getBlogsByUser(user?.id);

    sendResponse<BlogPost[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieved successfully!',
      data: result,
    });
  },
);

export const BlogController = {
  createBlogController,
  getBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogsByUserController,
};
