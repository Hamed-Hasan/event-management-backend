import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { SubscriberController } from './subscriber.controller';
import { SubscriberValidation } from './subscriber.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(SubscriberValidation.addSubscriberZodSchema),
  SubscriberController.addSubscriberController,
);

router.post(
  '/send',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(SubscriberValidation.sendEmailToSubscribersZodSchema),
  SubscriberController.sendEmailToSubscribersController,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SubscriberController.getSubscribersController,
);

router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SubscriberController.deleteSubscriberController,
);

export const SubscriberRoutes = router;
