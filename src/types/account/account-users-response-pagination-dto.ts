import type AccountUser from './account-user.type';

export default interface AccountUsersResponsePaginationDto {
  uuid: string;
  users: AccountUser[];
  total: number;
  page: number;
  limit: number;
  last_page: number;
}
