<script setup>
import BudgetModal from '@/components/system/budget/BudgetModal.vue'
import { ref } from 'vue'

const headers = [
  { title: 'Valor', value: 'amount' },
  { title: 'Profissional', value: 'professional' },
  { title: 'Paciente', value: 'patient' },
  { title: 'Data', value: 'createdAt' },
  { title: 'Status', value: 'status' },
  { title: 'Ações', value: 'actions', sortable: false },
]

const statuses = ['ABERTO', 'EM ANDAMENTO', 'CONCLUÍDO', 'CANCELADO']

const budgets = ref([
  {
    id: 1,
    amount: 250.5,
    professional: {
      name: 'João Silva',
      email: 'joao@example.com',
      avatar: null,
    },
    patient: {
      name: 'Maria Souza',
      email: 'maria@example.com',
      avatar: null,
    },
    createdAt: '2025-05-10',
    status: 'ABERTO',
  },
  // outros itens...
])

const editingStatusId = ref(null)

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const getStatusColor = (status) => {
  switch (status) {
    case 'ABERTO':
      return 'blue'
    case 'EM ANDAMENTO':
      return 'orange'
    case 'CONCLUÍDO':
      return 'green'
    case 'CANCELADO':
      return 'red'
    default:
      return 'grey'
  }
}

const viewItem = (item) => {
  console.log('Visualizar', item)
}
const editItem = (item) => {
  console.log('Editar', item)
}
const deleteItem = (item) => {
  console.log('Excluir', item)
}

const dialog = ref(false)

const openDialog = () => {
  dialog.value = true
}
</script>


<template>
  <v-container fluid>
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="openDialog()">
        <v-icon start>mdi-plus</v-icon>
        Adicionar Orçamento
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="budgets"
        item-value="id"
        class="elevation-1"
        density="comfortable"
      >
        <!-- Valor -->
        <template #item.amount="{ item }">
          <span>{{ formatCurrency(item.amount) }}</span>
        </template>
  
        <!-- Profissional -->
        <template #item.professional="{ item }">
          <div class="d-flex align-center gap-3">
            <v-avatar color="primary" size="36" class="mr-2">
              <v-img v-if="item.professional.avatar" :src="item.professional.avatar" />
              <span v-else>{{ getInitials(item.professional.name) }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.professional.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.professional.email }}</div>
            </div>
          </div>
        </template>
  
        <!-- Paciente -->
        <template #item.patient="{ item }">
          <div class="d-flex align-center gap-3">
            <v-avatar color="primary" size="36" class="mr-2">
              <v-img v-if="item.patient.avatar" :src="item.patient.avatar" />
              <span v-else>{{ getInitials(item.patient.name) }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.patient.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.patient.email }}</div>
            </div>
          </div>
        </template>
  
        <!-- Data -->
        <template #item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
  
        <!-- Status -->
        <template #item.status="{ item }">
          <div v-if="editingStatusId === item.id">
            <v-select
              v-model="item.status"
              :items="statuses"
              dense
              hide-details
              solo
              class="w-40"
              @blur="editingStatusId = null"
            />
          </div>
          <div v-else @click="editingStatusId = item.id" class="cursor-pointer">
            <v-chip :color="getStatusColor(item.status)" class="text-uppercase">
              {{ item.status }}
            </v-chip>
          </div>
        </template>
  
        <!-- Ações -->
        <template #item.actions="{ item }">
          <v-btn icon="mdi-eye" size="small" @click="viewItem(item)" />
          <v-btn icon="mdi-pencil" size="small" @click="editItem(item)" />
          <v-btn icon="mdi-delete" size="small" color="red" @click="deleteItem(item)" />
        </template>
      </v-data-table>
    </v-card>

    <BudgetModal v-model="dialog"/>

  </v-container>
</template>
