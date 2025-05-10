<script setup lang="ts">
import { ref, computed } from 'vue'

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
  { title: 'Atendimentos', icon: 'mdi-stethoscope', to: '/system/atendimentos' },
  { title: 'Sair', icon: 'mdi-logout', to: '/logout' }
]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!isMobile"
    :temporary="isMobile"
    :app="isMobile"
    :rail="!isMobile ? rail : false"
    width="220"
  >
    <v-list nav dense >
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        link
        @click="isMobile && emit('update:modelValue', false)"
      >
        <div class="d-flex align-center">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>