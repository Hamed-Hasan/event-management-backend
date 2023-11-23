import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlogController,
);

router.get(
  '/user',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BlogController.getBlogsByUserController,
);

router.get(
  '/',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BlogController.getBlogsController,
);
router.get(
  '/:id',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BlogController.getSingleBlogController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlogController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BlogController.deleteBlogController,
);

export const BlogRoutes = router;
