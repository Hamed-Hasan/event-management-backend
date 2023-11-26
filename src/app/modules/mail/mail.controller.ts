import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MailService } from './mail.service';

const sendMailController = catchAsync(async (req: Request, res: Response) => {
  const result = await MailService.sendMail(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'We got your message. We will get back to you soon. Thank you!',
    data: result,
  });
});

export const MailController = { sendMailController };
