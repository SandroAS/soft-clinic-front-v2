<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  cellphone: string
  type: 'ADMIN' | 'ASSISTANT' | 'HEALTHCARE_PROFESSIONAL'
  status: 'ACTIVE' | 'DEACTIVATED'
}

const users = ref<User[]>([
  {
    id: 1,
    name: 'Sandro Souza',
    email: 'sandro@sistema.com',
    cellphone: '31998136678',
    type: 'ADMIN',
    status: 'ACTIVE'
  },
  {
    id: 2,
    name: 'João da Silva',
    email: 'joao@email.com',
    cellphone: '31993789399',
    type: 'ASSISTANT',
    status: 'ACTIVE'
  }
])

const dialog = ref(false)
const isEditing = ref(false)
const selectedUser = ref<Partial<User & { password?: string; confirmPassword?: string }>>({})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const openCreateDialog = () => {
  selectedUser.value = {}
  isEditing.value = false
  dialog.value = true
}

const openEditDialog = (user: User) => {
  selectedUser.value = { ...user }
  isEditing.value = true
  dialog.value = true
}

const saveUser = () => {
  if (isEditing.value && selectedUser.value.id) {
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) users.value[index] = { ...selectedUser.value } as User
  } else {
    const newId = users.value.length + 1
    users.value.push({
      ...(selectedUser.value as User),
      id: newId,
      status: 'ACTIVE'
    })
  }
  dialog.value = false
}

const toggleStatus = (user: User) => {
  if (user.type === 'ADMIN') return
  user.status = user.status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE'
}
</script>

<template>
  <div>
    <div class="d-flex justify-end mb-4">
      <v-btn color="primary" @click="openCreateDialog">
        <v-icon start>mdi-plus</v-icon>
        Adicionar usuário
      </v-btn>
    </div>

    <v-data-table
      :headers="[
        { title: 'Nome', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Tipo', key: 'type' },
        { title: 'Status', key: 'status' },
        { title: 'Editar/Desativar', key: 'actions', sortable: false }
      ]"
      :items="users"
      item-value="id"
    >
      <template #item.status="{ item }">
        <v-chip :color="item.status === 'ACTIVE' ? 'green' : 'grey'" dark>
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div v-if="item.type !== 'ADMIN'">
          <v-btn icon @click="openEditDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="toggleStatus(item)">
            <v-icon>{{ item.status === 'ACTIVE' ? 'mdi-account-off' : 'mdi-account-check' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ isEditing ? 'Editar usuário' : 'Novo usuário' }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            v-model="selectedUser.name"
            required
            prepend-inner-icon="mdi-account"
            variant="solo-filled"
            density="comfortable"
          />
          <v-text-field
            label="Email"
            v-model="selectedUser.email"
            required
            type="email"
            prepend-inner-icon="mdi-email"
            variant="solo-filled"
            density="comfortable"
          />
          <v-text-field
            label="Telefone"
            v-model="selectedUser.cellphone"
            required
            type="cellphone"
            prepend-inner-icon="mdi-cellphone"
            variant="solo-filled"
            density="comfortable"
          />
          <v-text-field
            v-if="!isEditing"
            label="Senha"
            v-model="selectedUser.password"
            :type="showPassword ? 'text' : 'password'"
            required
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="solo-filled"
            density="comfortable"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-text-field
            v-if="!isEditing"
            label="Confirmação de senha"
            v-model="selectedUser.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="solo-filled"
            density="comfortable"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
          />
          <v-select
            label="Tipo"
            :items="['ASSISTANT', 'HEALTHCARE_PROFESSIONAL']"
            v-model="selectedUser.type"
            required
            variant="solo-filled"
            density="comfortable"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveUser">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
