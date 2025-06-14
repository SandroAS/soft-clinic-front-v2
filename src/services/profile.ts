import type { AxiosResponse } from 'axios';
import api from './api';
import type { ProfilePersonalInformation } from '@/types/profile/profile-personal-information.type';
import type { ProfilePersonalInformationResponse } from '@/types/profile/profile-personal-information-response.type';

export const updateUser = async (personalInformation: ProfilePersonalInformation): Promise<ProfilePersonalInformationResponse> => {
  const response: AxiosResponse<ProfilePersonalInformationResponse> = await api.put('/user/personal-information', personalInformation);
  return response.data;
};
