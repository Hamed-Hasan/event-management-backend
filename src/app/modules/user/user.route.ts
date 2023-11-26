import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get(
  '/profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.getProfileController,
);
router.get(
  '/get-all',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getAllUsersController,
);

router.get('/:id', UserController.getUserByIdController);

router.patch(
  '/profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateProfileController,
);
router.patch(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserController,
);

router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.deleteUserController,
);

export const UserRoutes = router;
