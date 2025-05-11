<script setup lang="ts">
import { ref, computed } from 'vue'
import { VDialog } from 'vuetify/components'

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

    <v-table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cor</th>
          <th>Tipo</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>
            <v-chip :color="category.color" class="text-white" label>{{ category.color }}</v-chip>
          </td>
          <td>{{ category.type === 'DENTE' ? 'Dente' : 'Face' }}</td>
          <td class="text-right">
            <v-btn
              icon="mdi-pencil"
              variant="text"
              :disabled="category.predefined"
              @click="openDialog(category)"
            />
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="red"
              :disabled="category.predefined"
              @click="deleteCategory(category.id)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

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
