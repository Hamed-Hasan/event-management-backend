import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Subscriber } from '@prisma/client';
import { SubscriberService } from './subscriber.service';
import { subscriberFilterableFields } from './subscriber.constant';

const addSubscriberController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.addSubscriber(req.body);

    sendResponse<Subscriber>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'You have successfully subscribed!',
      data: result,
    });
  },
);
const getSubscribersController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, subscriberFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await SubscriberService.getSubscribers(
      filters,
      paginationOptions,
    );

    sendResponse<Subscriber[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscribers retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

const sendEmailToSubscribersController = catchAsync(
  async (req: Request, res: Response) => {
    await SubscriberService.sendEmailToSubscribers(req.body);

    sendResponse<Subscriber[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Email sent successfully!',
    });
  },
);

const deleteSubscriberController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.deleteSubscriber(req.params.id);

    sendResponse<Subscriber | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscriber deleted successfully!',
      data: result,
    });
  },
);

export const SubscriberController = {
  addSubscriberController,
  getSubscribersController,
  sendEmailToSubscribersController,
  deleteSubscriberController,
};
