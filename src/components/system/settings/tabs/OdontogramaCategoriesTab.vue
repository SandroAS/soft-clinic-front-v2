<script setup lang="ts">
import { ref, computed } from 'vue'

type Category = {
  id: number
  name: string
  color: string
  type: 'DENTE' | 'FACE'
  predefined: boolean
}

const dialog = ref(false)
const isEdit = ref(false)
const editedItem = ref<Category | null>(null)

const predefinedCategories: Category[] = [
  { id: 1, name: 'Prótese', color: '#BDBDBD', type: 'DENTE', predefined: true },
  { id: 2, name: 'Resina', color: '#FFC107', type: 'DENTE', predefined: true },
  { id: 3, name: 'Cariado', color: '#D32F2F', type: 'FACE', predefined: true },
  { id: 4, name: 'Ausente', color: '#9E9E9E', type: 'DENTE', predefined: true }
]

const customCategories = ref<Category[]>([
  { id: 5, name: 'Canal Tratado', color: '#2196F3', type: 'DENTE', predefined: false }
])

const categories = computed(() => [
  ...predefinedCategories,
  ...customCategories.value
])

const openDialog = (item: Category | null = null) => {
  isEdit.value = !!item
  editedItem.value = item
    ? { ...item }
    : {
        id: Date.now(),
        name: '',
        color: '#1976D2',
        type: 'DENTE',
        predefined: false
      }
  dialog.value = true
}

const saveCategory = () => {
  const itemToSave = editedItem.value ?? {
    id: Date.now(),
    name: '',
    color: '#000000',
    type: 'DENTE',
    predefined: false
  }

  const { id, ...categoryData } = itemToSave

  if (isEdit.value) {
    const index = customCategories.value.findIndex(c => c.id === itemToSave.id)
    if (index !== -1) {
      customCategories.value[index] = { id: itemToSave.id, ...categoryData }
    }
  } else {
    customCategories.value.push({ id: itemToSave.id, ...categoryData })
  }

  dialog.value = false
}

const deleteCategory = (id: number) => {
  customCategories.value = customCategories.value.filter(c => c.id !== id)
}
</script>

<template>
  <div>
    <v-row justify="end">
      <v-btn color="primary" class="mb-4" @click="openDialog()">Nova Categoria</v-btn>
    </v-row>

    <!-- Data Table -->
    <v-data-table
      :headers="[
        { title: 'Nome', value: 'name' },
        { title: 'Cor', value: 'color' },
        { title: 'Tipo', value: 'type' },
        { title: 'Ações', value: 'actions', sortable: false }
      ]"
      :items="categories"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon
          variant="text"
          :disabled="item.predefined"
          @click="openDialog(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          color="red"
          :disabled="item.predefined"
          @click="deleteCategory(item.id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          {{ isEdit ? 'Editar Categoria' : 'Nova Categoria' }}
        </v-card-title>
        <v-card-text v-if="editedItem">
          <v-text-field
            v-model="editedItem.name"
            label="Nome"
            required
          />
          <v-color-picker
            v-model="editedItem.color"
            mode="hexa"
            label="Cor"
            hide-canvas
            show-swatches
            flat
          />
          <v-select
            v-model="editedItem.type"
            :items="['DENTE', 'FACE']"
            label="Tipo"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveCategory">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
