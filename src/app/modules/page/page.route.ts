import express from 'express';
import { PageController } from './page.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { PageValidation } from './page.validation';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(PageValidation.createPageZodSchema),
  PageController.createPageController,
);

router.get(
  '/user',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  PageController.getPagesByUserController,
);

router.get('/', PageController.getPagesController);
router.get('/:id', PageController.getSinglePageController);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(PageValidation.updatePageZodSchema),
  PageController.updatePageController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  PageController.deletePageController,
);

export const PageRoutes = router;
