<script setup lang="ts">
import { useOdontogramaCategoryStore } from '@/stores/odontograma-category.store';
import type OdontogramaCategory from '@/types/odontogramaCategory/odontograma-category.type';
import { ref, watch, onMounted } from 'vue'
import OdontogramaCategoryModal from '../odontogramaCategories/OdontogramaCategoryModal.vue';

const odontogramaCategoryStore = useOdontogramaCategoryStore();

const dialog = ref(false)
const selectedOdontogramaCategory = ref<OdontogramaCategory | null>(null);

const currentPage = ref(odontogramaCategoryStore.page);
const itemsPerPage = ref(odontogramaCategoryStore.limit);
const searchTerm = ref(odontogramaCategoryStore.search_term || '');

const openDialog = (item?: OdontogramaCategory) => {
  selectedOdontogramaCategory.value = item || null;
  dialog.value = true;
}

async function getOdontogramaCategories() {
  await odontogramaCategoryStore.getOdontogramaCategories({ page: currentPage.value, limit: itemsPerPage.value });
}

getOdontogramaCategories();

async function loadItems({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: any[] }) {
  const sortColumn = sortBy.length > 0 ? sortBy[0].key : undefined;
  const sortOrder = sortBy.length > 0 ? sortBy[0].order : undefined;
  const currentSearchTerm = searchTerm.value;

  let shouldFetch = false;

  if (page !== odontogramaCategoryStore.page) {
    odontogramaCategoryStore.page = page;
    shouldFetch = true;
  }

  if (itemsPerPage !== odontogramaCategoryStore.limit) {
    odontogramaCategoryStore.limit = itemsPerPage;
    odontogramaCategoryStore.page = 1;
    shouldFetch = true;
  }

  if (sortColumn !== odontogramaCategoryStore.sort_column || sortOrder !== odontogramaCategoryStore.sort_order) {
    odontogramaCategoryStore.sort_column = sortColumn;
    odontogramaCategoryStore.sort_order = sortOrder;
    odontogramaCategoryStore.page = 1;
    shouldFetch = true;
  }

  if (currentSearchTerm !== odontogramaCategoryStore.search_term) {
    odontogramaCategoryStore.search_term = currentSearchTerm;
    odontogramaCategoryStore.page = 1;
    shouldFetch = true;
  }

  if (shouldFetch) {
    await odontogramaCategoryStore.getOdontogramaCategories({ page: odontogramaCategoryStore.page, limit: odontogramaCategoryStore.limit, sort_column: odontogramaCategoryStore.sort_column, sort_order: odontogramaCategoryStore.sort_order, search_term: odontogramaCategoryStore.search_term });
  }

  if (!odontogramaCategoryStore.odontograma_categories && !odontogramaCategoryStore.loading) {
    await odontogramaCategoryStore.getOdontogramaCategories({ page: odontogramaCategoryStore.page, limit: odontogramaCategoryStore.limit, sort_column: odontogramaCategoryStore.sort_column, sort_order: odontogramaCategoryStore.sort_order, search_term: odontogramaCategoryStore.search_term });
  }
}

let searchDebounceTimeout: ReturnType<typeof setTimeout>;
watch(searchTerm, (newVal, oldVal) => {
  if (newVal === oldVal) return;

  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    odontogramaCategoryStore.page = 1;
    loadItems({
      page: odontogramaCategoryStore.page,
      itemsPerPage: odontogramaCategoryStore.limit,
      sortBy: odontogramaCategoryStore.sort_column ? [{ key: odontogramaCategoryStore.sort_column, order: odontogramaCategoryStore.sort_order || 'asc' }] : [],
    });
  }, 300);
});

onMounted(() => {
  loadItems({
    page: odontogramaCategoryStore.page,
    itemsPerPage: odontogramaCategoryStore.limit,
    sortBy: odontogramaCategoryStore.sort_column ? [{ key: odontogramaCategoryStore.sort_column, order: odontogramaCategoryStore.sort_order || 'asc' }] : []
  });
});
</script>

<template>
  <div>
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="openDialog()">
        <v-icon start>mdi-plus</v-icon>
        Nova Categoria
      </v-btn>
    </div>

    <v-data-table
      :headers="[
        { title: 'Nome', value: 'name' },
        { title: 'Cor', value: 'color' },
        { title: 'Tipo', value: 'type' },
        { title: 'Ações', value: 'actions', sortable: false, align: 'end' }
      ]"
      :items="odontogramaCategoryStore.odontograma_categories || []"
      item-key="id"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn
            icon
            @click="openDialog(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- <v-btn
            icon
            color="red"
            :disabled="item.predefined"
            @click="deleteCategory(item.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn> -->
        </div>
      </template>
    </v-data-table>

    <OdontogramaCategoryModal v-model="dialog" :selectedService="selectedOdontogramaCategory" />
  </div>
</template>
