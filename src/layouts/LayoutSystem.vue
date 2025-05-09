<template>
  <v-app>
    <!-- Barra superior fixa -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="pl-2">Meu Sistema</v-toolbar-title>
    </v-app-bar>

    <!-- Menu lateral fixo, abaixo da barra superior -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      width="220"
    >
      <v-list nav dense >
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
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

    <!-- Conteúdo principal -->
    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/system/dashboard' },
  { title: 'Pacientes', icon: 'mdi-account', to: '/system/pacientes' },
  { title: 'Orçamentos', icon: 'mdi-file-document-outline', to: '/system/orcamentos' },
  { title: 'Atendimentos', icon: 'mdi-stethoscope', to: '/system/atendimentos' },
  { title: 'Sair', icon: 'mdi-logout', to: '/logout' }
]
</script>
