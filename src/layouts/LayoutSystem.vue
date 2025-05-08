<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="pl-4">Meu Sistema</v-toolbar-title>
    </v-app-bar>

    <!-- Menu Lateral -->
    <SideBarMenu />

    <!-- Conteúdo principal -->
    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SideBarMenu from '@/components/system/SideBarMenu.vue'
</script>

