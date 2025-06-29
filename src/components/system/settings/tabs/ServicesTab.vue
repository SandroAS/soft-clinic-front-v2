<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useServiceStore } from '@/stores/service.store';
import { useSnackbarStore } from '@/stores/snackbar.store';
import { useSystemModuleStore } from '@/stores/system-module.store';
import type Service from '@/types/service/service.type';
import ServiceModal from '../services/ServiceModal.vue';

const serviceStore = useServiceStore();
const snackbarStore = useSnackbarStore();
const systemModuleStore = useSystemModuleStore();

const dialog = ref(false);
const selectedService = ref<Service | null>(null);

const currentPage = ref(serviceStore.page);
const itemsPerPage = ref(serviceStore.limit);
const searchTerm = ref(serviceStore.search_term || '');

const openDialog = (item?: Service) => {
  selectedService.value = item || null;
  dialog.value = true;
}

async function getServices() {
  await serviceStore.getServices({ page: currentPage.value, limit: itemsPerPage.value });
}

async function getSystemModules() {
  await systemModuleStore.getSystemModules();
}

getServices();
getSystemModules()

async function loadItems({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: any[] }) {
  const sortColumn = sortBy.length > 0 ? sortBy[0].key : undefined;
  const sortOrder = sortBy.length > 0 ? sortBy[0].order : undefined;
  const currentSearchTerm = searchTerm.value;

  let shouldFetch = false;

  if (page !== serviceStore.page) {
    serviceStore.page = page;
    shouldFetch = true;
  }

  if (itemsPerPage !== serviceStore.limit) {
    serviceStore.limit = itemsPerPage;
    serviceStore.page = 1;
    shouldFetch = true;
  }

  if (sortColumn !== serviceStore.sort_column || sortOrder !== serviceStore.sort_order) {
    serviceStore.sort_column = sortColumn;
    serviceStore.sort_order = sortOrder;
    serviceStore.page = 1;
    shouldFetch = true;
  }

  if (currentSearchTerm !== serviceStore.search_term) {
    serviceStore.search_term = currentSearchTerm;
    serviceStore.page = 1; // Reseta a página ao aplicar novo filtro
    shouldFetch = true;
  }

  if (shouldFetch) {
    await serviceStore.getServices({ page: serviceStore.page, limit: serviceStore.limit, sort_column: serviceStore.sort_column, sort_order: serviceStore.sort_order, search_term: serviceStore.search_term });
  }

  if (!serviceStore.services && !serviceStore.loading) {
    await serviceStore.getServices({ page: serviceStore.page, limit: serviceStore.limit, sort_column: serviceStore.sort_column, sort_order: serviceStore.sort_order, search_term: serviceStore.search_term });
  }
}

let searchDebounceTimeout: ReturnType<typeof setTimeout>;
watch(searchTerm, (newVal, oldVal) => {
  if (newVal === oldVal) return;

  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    serviceStore.page = 1;
    loadItems({
      page: serviceStore.page,
      itemsPerPage: serviceStore.limit,
      sortBy: serviceStore.sort_column ? [{ key: serviceStore.sort_column, order: serviceStore.sort_order || 'asc' }] : [],
    });
  }, 300);
});

onMounted(() => {
  loadItems({
    page: serviceStore.page,
    itemsPerPage: serviceStore.limit,
    sortBy: serviceStore.sort_column ? [{ key: serviceStore.sort_column, order: serviceStore.sort_order || 'asc' }] : []
  });
});
</script>

<template>
  <div>
    <div class="flex-column flex-md-row d-flex justify-space-between mb-4 mt-2 align-center">
      <v-text-field
        v-model="searchTerm"
        label="Buscar usuário"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        clearable
        class="mb-4 mb-md-0 w-md-auto w-100"
        style="max-width: 300px;"
      ></v-text-field>

      <v-btn color="primary" class="w-md-auto w-100" @click="openDialog">
        <v-icon start>mdi-plus</v-icon>
        Adicionar serviço
      </v-btn>
    </div>

    <v-data-table
      :headers="[
        { title: 'Nome', value: 'name', sortable: true },
        { title: 'Descrição', value: 'description', sortable: true },
        { title: 'Valor (R$)', value: 'price', align: 'end' },
        { title: 'Ações', value: 'actions', sortable: false, align: 'end' }
      ]"
      :items="serviceStore.services || []"
      item-value="uuid"
      :items-per-page="itemsPerPage"
      :items-per-page-options="[{title: '10', value: 10}, {title: '25', value: 25}, {title: '50', value: 50}, {title: '100', value: 100}]"
      :items-length="serviceStore.total"
      :loading="serviceStore.loading"
      :page="currentPage"
      mobile-breakpoint="md"
      @update:options="loadItems"
    >
      <template v-slot:[`item.price`]="{ item }">
        R$ {{ item.price }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- <v-btn icon color="red" @click="deleteService(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn> -->
        </div>
      </template>
    </v-data-table>

    <ServiceModal v-model="dialog" :selectedService="selectedService" />
  </div>
</template>
