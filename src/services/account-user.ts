import type { AxiosResponse } from 'axios';
import api from './api.service';
import type AccountUser from '@/types/account/account-user.type';
import type AccountUserPayload from '@/types/account/account-user-payload.type';

export const getAccountUsers = async () => {
  const response: AxiosResponse<{ uuid: string, users: AccountUser[] }> = await api.get('/account/users');
  return response.data.users;
};

export const saveAccountUser = async (accountUser: AccountUserPayload) => {
  const response: AxiosResponse<{ uuid: string, role: { uuid: string } }> = await api.post('/account/users', accountUser);
  return response.data;
};
