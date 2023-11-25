import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { FeedbackValidation } from './feedback.validation';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.USER),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedbackController,
);

router.get(
  '/user',
  auth(UserRole.USER),
  FeedbackController.getFeedbacksByUserController,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  FeedbackController.getFeedbacksController,
);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  FeedbackController.getSingleFeedbackController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateFeedbackController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  FeedbackController.deleteFeedbackController,
);

export const FeedbackRoutes = router;
