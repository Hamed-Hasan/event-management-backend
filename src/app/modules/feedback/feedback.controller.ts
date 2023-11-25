import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const createFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.createFeedback(req.body);

    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'We got your Feedback. Thank you!',
      data: result,
    });
  },
);
const getFeedbacksController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.getFeedbacks();

    sendResponse<Feedback[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieved successfully!',
      data: result,
    });
  },
);
const getSingleFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.getSingleFeedback(req.params.id);

    sendResponse<Feedback | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieved successfully!',
      data: result,
    });
  },
);

const updateFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.updateFeedback(
      req.params.id,
      req.body,
    );

    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback updated successfully!',
      data: result,
    });
  },
);

const deleteFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.deleteFeedback(req.params.id);

    sendResponse<Feedback | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback deleted successfully!',
      data: result,
    });
  },
);

const getFeedbacksByUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await FeedbackService.getFeedbacksByUser(user?.id);

    sendResponse<Feedback[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieved successfully!',
      data: result,
    });
  },
);

export const FeedbackController = {
  createFeedbackController,
  getFeedbacksController,
  getSingleFeedbackController,
  updateFeedbackController,
  deleteFeedbackController,
  getFeedbacksByUserController,
};
