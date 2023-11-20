import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';

const getAdminsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAdmins(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const makeAdminController = catchAsync(async (req: Request, res: Response) => {
  await AdminService.makeAdmin(req.body);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created successfully',
  });
});
const deleteAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.deleteAdmin(req.params.id);
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Deleted successfully',
      data: result,
    });
  },
);
const updateAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.updateAdmin(req.params.id, req.body);
    sendResponse<Partial<User> | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Updated successfully',
      data: result,
    });
  },
);

export const AdminController = {
  getAdminsController,
  makeAdminController,
  deleteAdminController,
  updateAdminController,
};
