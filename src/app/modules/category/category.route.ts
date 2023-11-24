import express from 'express';
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(CategoryValidation.createOrUpdateCategoryZodSchema),
  CategoryController.createCategoryController,
);

router.get(
  '/',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.getCategoriesController,
);
router.get(
  '/:id',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.getSingleCategoryController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(CategoryValidation.createOrUpdateCategoryZodSchema),
  CategoryController.updateCategoryController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.deleteCategoryController,
);

export const CategoryRoutes = router;
