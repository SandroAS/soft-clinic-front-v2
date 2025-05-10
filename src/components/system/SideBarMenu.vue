<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const props = defineProps<{
  isMobile: boolean
  modelValue: boolean
  rail: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const drawer = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/system/dashboard' },
  { title: 'Pacientes', icon: 'mdi-account', to: '/system/pacientes' },
  { title: 'Orçamentos', icon: 'mdi-file-document-outline', to: '/system/orcamentos' },
  { title: 'Atendimentos', icon: 'mdi-account-heart', to: '/system/atendimentos' },
  { title: 'Agendamentos', icon: 'mdi-calendar-account', to: '/system/agendamentos' },
  { title: 'Sair', icon: 'mdi-logout', to: '/logout' }
]

const agendamentosHoje = ref([
  { hora: '09:00', nome: 'Ana Silva', servico: 'Limpeza' },
  { hora: '11:30', nome: 'Carlos Pereira', servico: 'Extração' },
  { hora: '14:00', nome: 'Juliana Costa', servico: 'Canal' },
])

function dataFormatadaHoje() {
  return format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })
}

function iniciarAtendimento(item: { hora: string; nome: string; servico: string }) {
  console.log(`Iniciando atendimento de ${item.nome} para ${item.servico} às ${item.hora}`)
  // Aqui você pode redirecionar ou abrir modal, etc.
}

const hoje = new Date()
const abreviacaoMes = format(hoje, 'MMM', { locale: ptBR }).toUpperCase()
const diaDoMes = format(hoje, 'dd', { locale: ptBR })
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!isMobile"
    :temporary="isMobile"
    :app="isMobile"
    :rail="!isMobile ? rail : false"
    width="240"
    class="d-flex flex-column justify-space-between"
  >
    <!-- Menu principal (scrollável) -->
    <v-list nav density="comfortable" class="flex-grow-1 overflow-y-auto">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        link
        @click="isMobile && emit('update:modelValue', false)"
      >
        <template #prepend>
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="pa-2 border-t" style="border-top: 1px solid #ccc;">
      <div class="d-flex align-end justify-space-between mb-2">
        <div>
          <div class="text-subtitle-2 font-weight-medium">Agenda de Hoje</div>
          <div class="text-caption text-medium-emphasis">{{ dataFormatadaHoje() }}</div>
        </div>
        <div class="mini-calendario ml-2">
          <div class="mes">{{ abreviacaoMes }}</div>
          <div class="dia">{{ diaDoMes }}</div>
        </div>
      </div>

      <v-divider class="mb-2" />

      <div
        v-for="item in agendamentosHoje"
        :key="item.hora"
        class="d-flex align-center justify-space-between mb-2 elevation-1 rounded pa-2"
      >
        <div>
          <div class="text-caption font-weight-medium">{{ item.hora }} - {{ item.nome }}</div>
          <div class="text-caption text-medium-emphasis">{{ item.servico }}</div>
        </div>
        <v-btn
          size="x-small"
          variant="tonal"
          color="primary"
          @click="iniciarAtendimento(item)"
        >
          Iniciar
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.agenda-hoje {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}

.border-t {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.mini-calendario {
  width: 48px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
}

.mini-calendario .mes {
  background-color: #1976d2;
  color: white;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  padding: 2px 0;
  text-transform: uppercase;
}

.mini-calendario .dia {
  background-color: white;
  color: #1976d2;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px 0;
}
</style>