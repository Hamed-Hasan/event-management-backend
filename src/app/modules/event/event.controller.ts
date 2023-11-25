import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EventService } from './event.service';
import { eventFilterableFields } from './event.constant';

const createEventController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventService.createEvent(req.body);

    sendResponse<Event>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event created successfully!',
      data: result,
    });
  },
);
const getEventsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, eventFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getEvents(filters, paginationOptions);

  sendResponse<Event[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleEventController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventService.getSingleEvent(req.params.id);

    sendResponse<Event | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event retrieved successfully!',
      data: result,
    });
  },
);

const updateEventController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventService.updateEvent(req.params.id, req.body);

    sendResponse<Event>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event updated successfully!',
      data: result,
    });
  },
);

const deleteEventController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EventService.deleteEvent(req.params.id);

    sendResponse<Event | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event deleted successfully!',
      data: result,
    });
  },
);

export const EventController = {
  createEventController,
  getEventsController,
  getSingleEventController,
  updateEventController,
  deleteEventController,
};
