import type { AxiosResponse } from 'axios';
import api from './api';
import type { ProfilePersonalInformationResponse } from '@/types/profile/profile-personal-information-response.type';

export const updateUserPersonalInformation = async (uuid: string, personalInformation: FormData): Promise<ProfilePersonalInformationResponse> => {
  const response: AxiosResponse<ProfilePersonalInformationResponse> = await api.put(`/user/personal-information/${uuid}`, personalInformation, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return response.data;
};
