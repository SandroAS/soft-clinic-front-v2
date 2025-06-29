import { getSystemModules } from '@/services/sytem-module.service';
import type DataTableFilterParams from '@/types/dataTable/data-table-filter-params.type';
import type { SystemModule } from '@/types/systemModule/system-module.type';
import { defineStore } from 'pinia';

interface ServiceStoreState {
  system_modules: SystemModule[] | null;
  loading: boolean;
  error: string | null;
}

export enum SystemModuleName {
  DENTISTRY = 'DENTISTRY',
  PSYCHOLOGY = 'PSYCHOLOGY',
  NUTRITION = 'NUTRITION',
  PHYSIOTHERAPY = 'PHYSIOTHERAPY',
}

export const useSystemModuleStore = defineStore('systemModule', {
  state: (): ServiceStoreState => ({
    system_modules: null,
    loading: false,
    error: null
  }),

  getters: {},

  actions: {
    async getSystemModules() {
      this.loading = true;
      this.error = null;

      try {
       this.system_modules = await getSystemModules();
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao tentar atualizar serviço.';
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});
