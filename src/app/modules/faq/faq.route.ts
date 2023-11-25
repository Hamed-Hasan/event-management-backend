import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { FaqValidation } from './faq.validation';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(FaqValidation.createFaqZodSchema),
  FaqController.createFaqController,
);

router.get(
  '/user',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  FaqController.getFaqsByUserController,
);

router.get(
  '/',

  FaqController.getFaqsController,
);

router.get(
  '/:id',

  FaqController.getSingleFaqController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(FaqValidation.updateFaqZodSchema),
  FaqController.updateFaqController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  FaqController.deleteFaqController,
);

export const FaqRoutes = router;
