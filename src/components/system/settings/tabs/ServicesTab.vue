<script setup lang="ts">
import { ref, computed } from 'vue'

type Service = {
  id: number
  name: string
  description: string
  price: number
  predefined: boolean
}

const dialog = ref(false)
const isEdit = ref(false)
const editedItem = ref<Service | null>(null)

const predefinedServices: Service[] = [
  {
    id: 1,
    name: 'Avaliação',
    description: 'Consulta inicial para avaliação odontológica.',
    price: 100,
    predefined: true
  },
  {
    id: 2,
    name: 'Limpeza',
    description: 'Limpeza completa dos dentes.',
    price: 120,
    predefined: true
  },
  {
    id: 3,
    name: 'Extração',
    description: 'Extração de dente comprometido.',
    price: 250,
    predefined: true
  },
  {
    id: 4,
    name: 'Clareamento',
    description: 'Tratamento para clareamento dental.',
    price: 600,
    predefined: true
  }
]

const customServices = ref<Service[]>([
  {
    id: 5,
    name: 'Canal',
    description: 'Tratamento de canal em dente molar.',
    price: 900,
    predefined: false
  }
])

const services = computed(() => [
  ...predefinedServices,
  ...customServices.value
])

const openDialog = (item: Service | null = null) => {
  isEdit.value = !!item
  editedItem.value = item
    ? { ...item }
    : {
        id: Date.now(),
        name: '',
        description: '',
        price: 0,
        predefined: false
      }
  dialog.value = true
}

const saveService = () => {
  const itemToSave = editedItem.value ?? {
    id: Date.now(),
    name: '',
    description: '',
    price: 0,
    predefined: false
  }

  const { id, ...data } = itemToSave

  if (isEdit.value) {
    const index = customServices.value.findIndex(s => s.id === itemToSave.id)
    if (index !== -1) {
      customServices.value[index] = { id: itemToSave.id, ...data }
    }
  } else {
    customServices.value.push({ id: itemToSave.id, ...data })
  }

  dialog.value = false
}

const deleteService = (id: number) => {
  customServices.value = customServices.value.filter(s => s.id !== id)
}
</script>

<template>
  <div>
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="openDialog()">
        <v-icon start>mdi-plus</v-icon>
        Novo Serviço
      </v-btn>
    </div>

    <v-data-table
      :headers="[
        { title: 'Nome', value: 'name' },
        { title: 'Descrição', value: 'description' },
        { title: 'Valor (R$)', value: 'price', align: 'end' },
        { title: 'Ações', value: 'actions', sortable: false, align: 'end' }
      ]"
      :items="services"
      item-key="id"
    >
      <template v-slot:[`item.price`]="{ item }">
        R$ {{ item.price.toFixed(2).replace('.', ',') }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="!item.predefined">
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteService(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          {{ isEdit ? 'Editar Serviço' : 'Novo Serviço' }}
        </v-card-title>
        <v-card-text v-if="editedItem">
          <v-text-field
            v-model="editedItem.name"
            label="Nome"
            required
            variant="solo-filled"
            density="comfortable"
          />
          <v-textarea
            v-model="editedItem.description"
            label="Descrição"
            required
            variant="solo-filled"
            density="comfortable"
          />
          <v-text-field
            v-model.number="editedItem.price"
            label="Valor (R$)"
            prefix="R$"
            type="number"
            min="0"
            step="0.01"
            variant="solo-filled"
            density="comfortable"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveService">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
