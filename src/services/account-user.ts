import type { AxiosResponse } from 'axios';
import api from './api.service';
import type AccountUser from '@/types/account/account-user.type';
import type AccountUserPayload from '@/types/account/account-user-payload.type';

export const getAccountUsers = async () => {
  const response: AxiosResponse<{ uuid: string, users: AccountUser[] }> = await api.get('/account/users');
  return response.data.users;
};

export const saveAccountUser = async (accountUser: AccountUserPayload, uuid?: string) => {
  const response: AxiosResponse<{ uuid: string, role: { uuid: string } }> = uuid 
    ? await api.put(`/account/users/${uuid}`, accountUser)
    : await api.post('/account/users', accountUser);
  return response.data;
};

export const updateAccountUserIsActive = async (uuid: string) => {
  const response: AxiosResponse<boolean> = await api.patch(`/account/users/is-active/${uuid}`);
  return response.data;
};
