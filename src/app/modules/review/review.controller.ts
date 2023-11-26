import { Review } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const createReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.createReview(req.body);

    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review created successfully!',
      data: result,
    });
  },
);
const getReviewsController = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviews();

  sendResponse<Review[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully!',
    data: result,
  });
});
const getSingleReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getSingleReview(req.params.id);

    sendResponse<Review | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully!',
      data: result,
    });
  },
);

const updateReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.updateReview(req.params.id, req.body);

    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully!',
      data: result,
    });
  },
);

const deleteReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.deleteReview(req.params.id);

    sendResponse<Review | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully!',
      data: result,
    });
  },
);
const getReviewsByEventIdController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getReviewsByEventId(req.params.id);

    sendResponse<Review[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully!',
      data: result,
    });
  },
);
const getReviewsByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ReviewService.getReviewsByUser(user?.id);

    sendResponse<Review[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully!',
      data: result,
    });
  },
);

export const ReviewController = {
  createReviewController,
  getReviewsController,
  getSingleReviewController,
  updateReviewController,
  deleteReviewController,
  getReviewsByEventIdController,
  getReviewsByUserController,
};
