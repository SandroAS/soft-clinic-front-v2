import { defineStore } from 'pinia';
import { fetchWhoami, loginUser, signupUser } from '@/services/auth';
import type { AuthUser } from '@/types/auth-user.type';
import type { AuthResponse } from '@/types/auth-response.type';
import router from '@/router';

interface UserStoreState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.user,
    userName: (state): string => state.user?.name || 'Visitante',
    userEmail: (state): string | undefined => state.user?.email,
    userProfileImageUrl: (state): string | null | undefined => state.user?.profile_img_url,
    userPermissions: (state): string[] => state.user?.role?.permissions || [],
    currentUser: (state): AuthUser | null => state.user,
  },

  actions: {
    async fetchUser(): Promise<AuthUser | null> {
      this.loading = true;
      this.error = null;
      try {
        const userData: AuthUser = await fetchWhoami();
        this.user = userData;
        return userData;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Falha ao carregar dados do usuário.';
        this.user = null;
        console.error('Erro na ação fetchUser:', err);
        localStorage.removeItem('access_token');
        router.push('/login');
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async handleAuthSuccess(accessToken: string, userData?: AuthUser | null) {
      localStorage.setItem('access_token', accessToken);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.user = userData;
      } else {
        await this.fetchUser();
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      router.push('/auth/login');
    },


    async login(email: string, password: string): Promise<AuthUser | null> {
      this.loading = true;
      this.error = null;
      try {
        const response: AuthResponse = await loginUser(email, password);
        await this.handleAuthSuccess(response.accessToken, response.user);
        return this.user;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao realizar login.';
        this.user = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async signup(email: string, password: string): Promise<AuthUser | null> {
      this.loading = true;
      this.error = null;
      try {
        const response: AuthResponse = await signupUser(email, password);
        await this.handleAuthSuccess(response.accessToken, response.user);
        return this.user;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao realizar cadastro.';
        this.user = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});