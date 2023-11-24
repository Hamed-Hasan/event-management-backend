import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import sendResponse from '../../../shared/sendResponse';
import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { categoryFilterableFields } from './category.constant';

const createCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
  },
);
const getCategoriesController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, categoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CategoryService.getCategories(
      filters,
      paginationOptions,
    );

    sendResponse<Category[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categories retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);
const getSingleCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getSingleCategory(req.params.id);

    sendResponse<Category | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category retrieved successfully!',
      data: result,
    });
  },
);

const updateCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategory(
      req.params.id,
      req.body,
    );

    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully!',
      data: result,
    });
  },
);

const deleteCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.deleteCategory(req.params.id);

    sendResponse<Category | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully!',
      data: result,
    });
  },
);

export const CategoryController = {
  createCategoryController,
  getCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
