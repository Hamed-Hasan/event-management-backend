import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

const signupController = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Signed up successfully! Please login',
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { refreshToken, ...othersData } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: othersData,
  });
});

const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  },
);

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...passwordData } = req.body;

    await AuthService.changePassword(user, passwordData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password Changed successfully',
    });
  },
);

// logout and remove refresh token from cookie
const logoutController = catchAsync(async (req: Request, res: Response) => {
  // const { refreshToken } = req.cookies;

  // await AuthService.logout(refreshToken);

  res.clearCookie('refreshToken');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully',
  });
});

export const AuthController = {
  signupController,
  loginController,
  refreshTokenController,
  changePasswordController,
  logoutController,
};
