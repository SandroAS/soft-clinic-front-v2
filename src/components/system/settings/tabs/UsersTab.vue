<script setup lang="ts">
import { ref } from 'vue'
import UserModal from '../users/UserModal.vue'
import type AccountUser from '@/types/account/account-user.type'
import { useAccountUserStore } from '@/stores/account-user';
import { getInitials } from '@/utils/getInitialsFromName.util';

const accountUserStore = useAccountUserStore();

const dialog = ref(false);
const selectedAccountUser = ref<AccountUser| null>(null);

const openDialog = (item: AccountUser) => {
  selectedAccountUser.value = item;
  dialog.value = true;
}

const toggleStatus = (accountUser: AccountUser) => {
  if (accountUser.role.name === 'ADMIN') return;
  accountUser.is_active = accountUser.is_active === true ? false : false;
}

async function getUsers() {
  await accountUserStore.getAccountUsers();
}

getUsers();
</script>

<template>
  <div>
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="openDialog">
        <v-icon start>mdi-plus</v-icon>
        Adicionar usuário
      </v-btn>
    </div>

    <v-data-table
      :headers="[
        { title: 'Nome', key: 'name' },
        { title: 'Telefone', key: 'cellphone' },
        { title: 'Tipo', key: 'role.name' },
        { title: 'Status', key: 'is_active' },
        { title: 'Editar/Desativar', key: 'actions', sortable: false, align: 'end' }
      ]"
      :items="accountUserStore.account_users || undefined"
      item-value="id"
    >
      <template #item.name="{ item }">
        <div class="d-flex align-center gap-3">
          <v-avatar color="primary" size="36" class="mr-2">
            {{ getInitials(item.name) }}
          </v-avatar>
          <div>
            <div class="font-weight-medium">{{ item.name }}</div>
            <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
          </div>
        </div>
      </template>

      <template #item.is_active="{ item }">
        <v-chip :color="item.is_active ? 'green' : 'grey'" dark>
          {{ item.is_active ? 'ATIVO' : 'INATIVO' }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div v-if="item.role.name !== 'ADMIN'">
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="toggleStatus(item)">
            <v-icon>{{ item.is_active ? 'mdi-account-off' : 'mdi-account-check' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <UserModal v-model="dialog" :selectedAccountUser="selectedAccountUser"/>
  </div>
</template>
