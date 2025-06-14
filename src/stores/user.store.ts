import { defineStore } from 'pinia';
import { createTermsAcceptedInUserMetas, fetchWhoami, loginUser, signupUser } from '@/services/auth';
import type { AuthUser } from '@/types/auth/auth-user.type';
import type { AuthResponse } from '@/types/auth/auth-response.type';
import router from '@/router';
import type { UserRegister } from '@/types/user/user-register.type';
import type { UserMeta } from '@/types/user/user-meta.type';
import type { ProfilePersonalInformation } from '@/types/profile/profile-personal-information.type';
import { updateUser } from '@/services/profile';

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
        if(!localStorage.getItem('access_token')) return null;
        const userData: AuthUser = await fetchWhoami();
        localStorage.setItem('user', JSON.stringify(userData));
        this.user = userData;
        return userData;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Falha ao carregar dados do usuário.';
        console.error('Erro na ação fetchUser:', err);
        this.logout();
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
      this.loading = false;
      this.error = null;
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

    async signup(userRegister: UserRegister): Promise<AuthUser | null> {
      this.loading = true;
      this.error = null;
      try {
        const response: AuthResponse = await signupUser(userRegister);
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

    async termsAcceptedAfterGoogleAuthCallback(userUuid: string) {
      this.loading = true;
      this.error = null;
      try {
        const response: UserMeta[] = await createTermsAcceptedInUserMetas(userUuid);
        if(this.user) {
          this.user.userMetas = response;
        }
        return response;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao realizar cadastro.';
        this.user = null;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(personalInformation: ProfilePersonalInformation) {
      this.loading = true;
      this.error = null;
      try {
        const response = await updateUser(this.user!.uuid, personalInformation);
        this.user!.name = personalInformation.name;
        this.user!.email = personalInformation.email;
        this.user!.cellphone = personalInformation.cellphone;
        this.user!.cpf = personalInformation.cpf;
        if(response.profile_img_url) this.user!.profile_img_url = response.profile_img_url;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar atualizar usuário.';
        throw err;
      } finally {
        this.loading = false;
      }
    }
  },
});