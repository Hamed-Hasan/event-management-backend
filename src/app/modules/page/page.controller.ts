import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PageService } from './page.service';
import { Pages } from '@prisma/client';
import { pageFilterableFields } from './page.constant';

const createPageController = catchAsync(async (req: Request, res: Response) => {
  const result = await PageService.createPage(req.body);

  sendResponse<Pages>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page created successfully!',
    data: result,
  });
});
const getPagesController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, pageFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PageService.getPages(filters, paginationOptions);

  sendResponse<Pages[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pages retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSinglePageController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PageService.getSinglePage(req.params.id);

    sendResponse<Pages | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Page retrieved successfully!',
      data: result,
    });
  },
);

const updatePageController = catchAsync(async (req: Request, res: Response) => {
  const result = await PageService.updatePage(req.params.id, req.body);

  sendResponse<Pages>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page updated successfully!',
    data: result,
  });
});

const deletePageController = catchAsync(async (req: Request, res: Response) => {
  const result = await PageService.deletePage(req.params.id);

  sendResponse<Pages | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page deleted successfully!',
    data: result,
  });
});
const getPagesByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await PageService.getPagesByUser(user?.id);

    sendResponse<Pages[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pages retrieved successfully!',
      data: result,
    });
  },
);

export const PageController = {
  createPageController,
  getPagesController,
  getSinglePageController,
  updatePageController,
  deletePageController,
  getPagesByUserController,
};
