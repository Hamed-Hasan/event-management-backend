import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data,
  });
  return result;
};

const getFeedbacks = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });
  return result;
};

const getSingleFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateFeedback = async (
  id: string,
  data: Feedback,
): Promise<Feedback | null> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
    },
  });
  return result;
};

const deleteFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const getFeedbacksByUser = async (
  userId: string,
): Promise<Feedback[] | null> => {
  const result = await prisma.feedback.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbacksByUser,
};
