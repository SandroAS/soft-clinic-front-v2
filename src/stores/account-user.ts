import { getAccountUsers, saveAccountUser } from '@/services/account-user';
import type AccountUserPayload from '@/types/account/account-user-payload.type';
import type AccountUser from '@/types/account/account-user.type';
import { RoleType } from '@/types/user/user-role.type';
import { defineStore } from 'pinia';

interface AccountUserStoreState {
  account_users: AccountUser[] | null;
  loading: boolean;
  error: string | null;
}

export const useAccountUserStore = defineStore('accountUser', {
  state: (): AccountUserStoreState => ({
    account_users: null,
    loading: false,
    error: null
  }),

  getters: {},

  actions: {
    async saveAccountUser(accountUser: AccountUserPayload) {
      this.loading = true;
      this.error = null;

      try {
        const { uuid, role }: { uuid: string, role: { uuid: string } } = await saveAccountUser(accountUser);
        if(!this.account_users) this.account_users = [];
        this.account_users.push({
          uuid,
          name: accountUser.name,
          email: accountUser.email,
          cellphone: accountUser.cellphone,
          cpf: accountUser.cpf,
          is_active: true,
          password: 'passworldAlreadySet',
          role: {
            uuid: role.uuid,
            name: accountUser.role,
            permissions: []
          }
        });
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar atualizar usuário.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async getAccountUsers() {
      this.loading = true;
      this.error = null;

      try {
        const res: AccountUser[] = await getAccountUsers();
        this.account_users = res;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar atualizar usuário.';
        throw err;
      } finally {
        this.loading = false;
      }
    }
  },
});
