import { EventStatus } from '@prisma/client';

export type IEventFilters = {
  query?: string;
  title?: string;
  location?: string;
  status?: EventStatus;
};
