import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { excludePassword, isPasswordMatch } from '../../../shared/utils';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';

const signup = async (data: User): Promise<Partial<User>> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds),
  );

  const result = await prisma.user.create({
    data,
  });
  const newResult = excludePassword(result, ['password']);

  return newResult;
};

const login = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;

  // check if user exist
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check password

  if (
    isUserExist.password &&
    !(await isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const { id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // checking deleted users refresh token
  const { id } = verifiedToken;

  // check if user exist
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<Partial<User>> => {
  const { currentPassword, newPassword } = payload;

  // check if user exist
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check password

  if (
    isUserExist.password &&
    !(await isPasswordMatch(currentPassword, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Current Password is incorrect',
    );
  }

  // check password

  if (
    isUserExist.password &&
    (await isPasswordMatch(newPassword, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Current password can not be same as old password!',
    );
  }

  isUserExist.password = newPassword;

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  const result = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      password: newHashPassword,
    },
  });
  const newResult = excludePassword(result, ['password']);

  return newResult;
};

export const AuthService = {
  signup,
  login,
  refreshToken,
  changePassword,
};
