import type { AxiosResponse } from 'axios';
import api from './api.service';
import type ServicePayload from '@/types/service/service-payload.type';
import type ServiceResponsePagination from '@/types/service/service-response-pagination.type';

export const getServices = async (page: number = 1, limit: number = 10, sortColumn?: string, sortOrder?: 'asc' | 'desc', searchTerm?: string): Promise<ServiceResponsePagination> => {
  const params: any = { page, limit };

  if (sortColumn) params.sort_column = sortColumn;
  if (sortOrder) params.sort_order = sortOrder;
  if (searchTerm) params.search_term = searchTerm;

  const response: AxiosResponse<ServiceResponsePagination> = await api.get('/service', { params });

  return response.data;
};

export const saveService = async (service: ServicePayload, uuid?: string) => {
  const response: AxiosResponse<{ uuid: string }> = uuid 
    ? await api.put(`/service/${uuid}`, service)
    : await api.post('/service', service);
  return response.data;
};

export const removeService = async (uuid: string) => {
  const response: AxiosResponse<boolean> = await api.delete(`/service/${uuid}`);
  return response.data;
};
