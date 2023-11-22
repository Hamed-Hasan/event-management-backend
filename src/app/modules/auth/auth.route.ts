import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signupZodSchema),
  AuthController.signupController,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginController,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshTokenController,
);
router.patch(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  AuthController.changePasswordController,
);

// logout route
router.post(
  '/logout',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  AuthController.logoutController,
);

export const AuthRoutes = router;
