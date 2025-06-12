import type { AuthResponse } from '@/types/auth-response.type';
import type { AuthUser } from '@/types/auth-user.type';
import { type AxiosResponse } from 'axios';
import api from './api';

export const fetchWhoami = async (): Promise<AuthUser> => {
  try {
    const response: AxiosResponse<AuthUser> = await api.get('/auth/whoami');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário (whoami):', error);
    throw error;
  }
};

export const loginUser = async (email: string, password?: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (email: string, password?: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/auth/signup', { email, password });
  return response.data;
};
