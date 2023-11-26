export type ISubscriberFilters = {
  query?: string;
  email?: string;
};

export type ISendEmailToSubscribers = {
  subject: string;
  message: string;
};
