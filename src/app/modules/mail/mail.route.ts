import express from 'express';
import { MailController } from './mail.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MailValidation } from './mail.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(MailValidation.sendMailZodSchema),
  MailController.sendMailController,
);

export const MailRoutes = router;
