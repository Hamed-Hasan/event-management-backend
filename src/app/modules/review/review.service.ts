import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createReview = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data,
    include: {
      event: true,
    },
  });
  return result;
};

const getReviews = async (): Promise<Review[]> => {
  const result = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      // event: true,
      user: true,
    },
  });
  return result;
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      event: true,
    },
  });
  return result;
};

const updateReview = async (
  id: string,
  data: Review,
): Promise<Review | null> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data,
    include: {
      event: true,
    },
  });
  return result;
};

const deleteReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
};

const getReviewsByEventId = async (
  eventId: string,
): Promise<Review[] | null> => {
  const result = await prisma.review.findMany({
    where: {
      eventId,
    },
    include: {
      event: true,
      user: true,
    },
  });
  return result;
};
const getReviewsByUser = async (userId: string): Promise<Review[] | null> => {
  const result = await prisma.review.findMany({
    where: {
      userId,
    },
    include: {
      event: true,
    },
  });
  return result;
};

export const ReviewService = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getReviewsByEventId,
  getReviewsByUser,
};
