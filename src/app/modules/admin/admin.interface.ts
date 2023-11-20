export type IAdminFilters = {
  email?: string;
  firstName?: string;
  lastName?: string;
  contactNo?: string;
  query?: string;
};

export type MakeAdminInfo = {
  email: string;
};
export type IMakeAdmin = {
  users: MakeAdminInfo[];
};
