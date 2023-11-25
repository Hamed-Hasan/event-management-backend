import express from 'express';
import { EventController } from './event.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { EventValidation } from './event.validation';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(EventValidation.createEventZodSchema),
  EventController.createEventController,
);

router.get(
  '/',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  EventController.getEventsController,
);
router.get(
  '/:id',
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  EventController.getSingleEventController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(EventValidation.updateEventZodSchema),
  EventController.updateEventController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  EventController.deleteEventController,
);

export const EventRoutes = router;
