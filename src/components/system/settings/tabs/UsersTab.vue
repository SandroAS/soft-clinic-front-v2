<script setup lang="ts">
import { ref, watch } from 'vue'
import UserModal from '../users/UserModal.vue'
import type AccountUser from '@/types/account/account-user.type'
import { useAccountUserStore } from '@/stores/account-user';
import { getInitials } from '@/utils/getInitialsFromName.util';
import { useSnackbarStore } from '@/stores/snackbar.store';

const accountUserStore = useAccountUserStore();
const snackbarStore = useSnackbarStore();

const dialog = ref(false);
const selectedAccountUser = ref<AccountUser| null>(null);

const currentPage = ref(accountUserStore.page);
const itemsPerPage = ref(accountUserStore.limit);

watch(() => accountUserStore.page, (newPage) => {
  currentPage.value = newPage;
});
watch(() => accountUserStore.limit, (newLimit) => {
  itemsPerPage.value = newLimit;
});

const openDialog = (item?: AccountUser) => {
  selectedAccountUser.value = item || null;
  dialog.value = true;
}

async function updateIsActive(accountUser: AccountUser) {
  try {
    await accountUserStore.updateAccountUserIsActive(accountUser.uuid!);
  } catch (err) {
    console.error(err);
    snackbarStore.show('Falha ao tentar ativar/inativar usuário. Erro: '+err, 'error')
  }
}

async function getUsers() {
  await accountUserStore.getAccountUsers({ page: currentPage.value, limit: itemsPerPage.value });
}

function onPageChange(page: number) {
  accountUserStore.setPage(page);
}

function onItemsPerPageChange(newLimit: number) {
  accountUserStore.setItemsPerPage(newLimit);
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
        { title: 'Editar', key: 'actions', sortable: false, align: 'end' }
      ]"
      :items="accountUserStore.account_users || []"
      item-value="uuid"
      :items-per-page="itemsPerPage"
      :items-per-page-options="[{title: '10', value: 10}, {title: '25', value: 25}, {title: '50', value: 50}, {title: '100', value: 100}]"
      :items-length="accountUserStore.total"
      :loading="accountUserStore.loading"
      :page="currentPage"
      @update:options="({ page, itemsPerPage: limit }) => {
        if (page !== currentPage) {
          onPageChange(page);
        }
        if (limit !== itemsPerPage) {
          onItemsPerPageChange(limit);
        }
      }"
    >
      <template #item.name="{ item }">
        <div class="d-flex align-center gap-3">
          <v-avatar color="primary" size="36" class="mr-2">
            <template v-if="item.profile_img_url">
              <v-img :src="item.profile_img_url"></v-img>
            </template>
            <template v-else>
              {{ getInitials(item.name) }}
            </template>
          </v-avatar>
          <div>
            <div class="font-weight-medium">{{ item.name }}</div>
            <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
          </div>
        </div>
      </template>

      <template #item.is_active="{ item }">
        <div style="min-width: 132px;">
          <v-switch
            :model-value="item.is_active"
            :label="item.is_active ? 'Ativado' : 'Desativado'"
            :color="item.is_active ? 'green' : 'grey'"
            hide-details
            @change="updateIsActive(item)"
          ></v-switch>
        </div>
      </template>

      <template #item.actions="{ item }">
        <div v-if="item.role.name !== 'ADMIN'">
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <UserModal v-model="dialog" :selectedAccountUser="selectedAccountUser"/>
  </div>
</template>
