import { FAQ } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaq = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data,
  });
  return result;
};

const getFaqs = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

const getSingleFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateFaq = async (id: string, data: FAQ): Promise<FAQ | null> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });
  return result;
};

const getFaqsByUser = async (userId: string): Promise<FAQ[] | null> => {
  const result = await prisma.fAQ.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const FaqService = {
  createFaq,
  getFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
  getFaqsByUser,
};
