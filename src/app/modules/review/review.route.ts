import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReviewController,
);

router.get(
  '/user',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewController.getReviewsByUserController,
);

router.get(
  '/',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewController.getReviewsController,
);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewController.getSingleReviewController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReviewController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ReviewController.deleteReviewController,
);

router.get(
  '/events/:eventId',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewController.getReviewsByEventIdController,
);

export const ReviewRoutes = router;
