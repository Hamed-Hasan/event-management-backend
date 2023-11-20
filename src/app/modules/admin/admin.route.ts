import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validaiton';
const router = express.Router();

router.post(
  '/make-admin',
  auth(UserRole.SUPER_ADMIN),
  validateRequest(AdminValidation.makeAdminZodSchema),
  AdminController.makeAdminController,
);
router.patch(
  '/:id',
  auth(UserRole.SUPER_ADMIN),
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdminController,
);

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN),
  AdminController.getAdminsController,
);

router.delete(
  '/:id',
  auth(UserRole.SUPER_ADMIN),
  AdminController.deleteAdminController,
);

export const AdminRoutes = router;
