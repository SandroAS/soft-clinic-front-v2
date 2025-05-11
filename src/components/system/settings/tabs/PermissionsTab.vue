<script setup lang="ts">
import { ref } from 'vue'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSwitch } from 'vuetify/components'

interface PermissionGroup {
  role: 'ADMIN' | 'ASSISTANT' | 'HEALTHCARE_PROFESSIONAL'
  description: string
  permissions: {
    patients: boolean
    users: boolean
    appointments: boolean
    services: boolean
    schedules: boolean
    budgets: boolean
  }
}

// Dados fixos dos grupos de permissão
const permissionsGroups = ref<PermissionGroup[]>([
  {
    role: 'ADMIN',
    description: 'Administrador com todas as permissões',
    permissions: {
      patients: true,
      users: true,
      appointments: true,
      services: true,
      schedules: true,
      budgets: true,
    }
  },
  {
    role: 'ASSISTANT',
    description: 'Usuário com permissões limitadas',
    permissions: {
      patients: true,
      users: false,
      appointments: true,
      services: false,
      schedules: true,
      budgets: false,
    }
  },
  {
    role: 'HEALTHCARE_PROFESSIONAL',
    description: 'Profissional da saúde com foco nos atendimentos',
    permissions: {
      patients: true,
      users: false,
      appointments: true,
      services: true,
      schedules: true,
      budgets: true,
    }
  }
])

const selectedGroup = ref<PermissionGroup | null>(null)
const isViewDialogOpen = ref(false)

function viewPermissions(group: any) {
  selectedGroup.value = group
  isViewDialogOpen.value = true
}
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h6">Grupos de Permissões</span>
    </v-card-title>

    <v-data-table
      :headers="[
        { title: 'Grupo', value: 'role' },
        { title: 'Descrição', value: 'description' },
        { title: 'Ações', value: 'actions', sortable: false }
      ]"
      :items="permissionsGroups"
      item-value="role"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn icon @click="viewPermissions(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal de Visualização -->
    <v-dialog v-model="isViewDialogOpen" max-width="600">
      <v-card>
        <v-card-title>
          Permissões do grupo: {{ selectedGroup?.role }}
        </v-card-title>
        <v-card-text>
          <v-switch
            label="Cadastro de Pacientes"
            :model-value="selectedGroup?.permissions.patients"
            readonly
            color="primary"
            hide-details
          />
          <v-switch
            label="Cadastro de Usuários"
            :model-value="selectedGroup?.permissions.users"
            readonly
            color="primary"
            hide-details
          />
          <v-switch
            label="Cadastro de Atendimentos"
            :model-value="selectedGroup?.permissions.appointments"
            readonly
            color="primary"
            hide-details
          />
          <v-switch
            label="Cadastro de Serviços"
            :model-value="selectedGroup?.permissions.services"
            readonly
            color="primary"
            hide-details
          />
          <v-switch
            label="Cadastro de Agendamentos"
            :model-value="selectedGroup?.permissions.schedules"
            readonly
            color="primary"
            hide-details
          />
          <v-switch
            label="Cadastro de Orçamentos"
            :model-value="selectedGroup?.permissions.budgets"
            readonly
            color="primary"
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="isViewDialogOpen = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
