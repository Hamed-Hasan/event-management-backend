export type IBookingFilters = {
  status?: string;
};
export type IConfirmBooking = {
  amount: number;
  currency: string;
  paymentId: string;
  userId: string;
  bookingId: string;
};

export type ITimeRange = 'today' | '7days' | '1month' | 'year';

export type IGetBookingsData = {
  timeRange: ITimeRange;
  year?: number;
};
