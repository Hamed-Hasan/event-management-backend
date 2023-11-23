import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/create-payment-intents',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BookingController.createPaymentIntentsController,
);
router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBookingController,
);

router.post(
  '/confirm',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(BookingValidation.confirmBookingZodSchema),
  BookingController.confirmBookingController,
);

router.post(
  '/get-data',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BookingController.getBookingsDataController,
);
router.get(
  '/payment-details/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BookingController.getPaymentDetailsController,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BookingController.getBookingsController,
);

router.get(
  '/user',
  auth(UserRole.USER),
  BookingController.getBookingsByUserController,
);
router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BookingController.getSingleBookingController,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(BookingValidation.updateBookingZodSchema),
  BookingController.updateBookingController,
);
router.patch(
  '/user/:id',
  auth(UserRole.USER),
  BookingController.cancelBookingController,
);
router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BookingController.deleteBookingController,
);

export const BookingRoutes = router;
