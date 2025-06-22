import { getAccountUsers, saveAccountUser, updateAccountUserIsActive } from '@/services/account-user';
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
    async saveAccountUser(accountUser: AccountUserPayload, uuid?: string) {
      this.loading = true;
      this.error = null;

      try {
        const res: { uuid: string, role: { uuid: string } } = await saveAccountUser(accountUser, uuid);
        if(!this.account_users) this.account_users = [];
        const accountUserSaved = {
          uuid: res.uuid,
          name: accountUser.name,
          email: accountUser.email,
          cellphone: accountUser.cellphone,
          cpf: accountUser.cpf,
          is_active: true,
          password: 'passworldAlreadySet',
          role: {
            uuid: res.role.uuid,
            name: accountUser.role,
            permissions: []
          }
        }
        if(uuid) {
          const accountUserFind = this.account_users.find(x => x.uuid === uuid);
          const index = this.account_users.indexOf(accountUserFind!);
          this.account_users.splice(index, 1, accountUserSaved!)
        } else {
          this.account_users.push(accountUserSaved);
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar atualizar usuário.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateAccountUserIsActive(uuid: string) {
      this.loading = true;
      this.error = null;

      try {
        const res: boolean = await updateAccountUserIsActive(uuid);
        if(!res) this.error = 'Erro ao tentar ativar/inativar usuário.';
        const accountUserFind = this.account_users!.find(x => x.uuid === uuid);
        const index = this.account_users!.indexOf(accountUserFind!);
        this.account_users!.splice(index, 1, {...accountUserFind!, is_active: !accountUserFind!.is_active})
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar ativar/inativar usuário.';
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
