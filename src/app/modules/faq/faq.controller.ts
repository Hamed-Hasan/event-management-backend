import { FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const createFaqController = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.createFaq(req.body);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq created successfully!',
    data: result,
  });
});
const getFaqsController = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getFaqs();

  sendResponse<FAQ[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faqs retrieved successfully!',
    data: result,
  });
});
const getSingleFaqController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FaqService.getSingleFaq(req.params.id);

    sendResponse<FAQ | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs retrieved successfully!',
      data: result,
    });
  },
);

const updateFaqController = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.updateFaq(req.params.id, req.body);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq updated successfully!',
    data: result,
  });
});

const deleteFaqController = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.deleteFaq(req.params.id);

  sendResponse<FAQ | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully!',
    data: result,
  });
});

const getFaqsByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await FaqService.getFaqsByUser(user?.id);

    sendResponse<FAQ[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs retrieved successfully!',
      data: result,
    });
  },
);

export const FaqController = {
  createFaqController,
  getFaqsController,
  getSingleFaqController,
  updateFaqController,
  deleteFaqController,
  getFaqsByUserController,
};
