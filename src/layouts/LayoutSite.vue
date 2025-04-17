<script lang="ts" setup>
// Nada necessário aqui por enquanto
</script>

<template>
  <v-app>
    <v-app-bar color="white" elevation="1" style="position: fixed;">
      <div class="d-flex align-center justify-space-between w-100 px-4">
        <a href="#home" class="text-decoration-none">
          <div class="d-flex align-center">
            <v-icon color="primary" size="32" class="me-2">mdi-heart-pulse</v-icon>
            <span class="text-primary font-weight-bold text-h5">Soft Clinic</span>
          </div>
        </a>
        
        <div class="d-none d-md-flex align-center">
          <v-btn variant="text" href="#resources">Recursos</v-btn>
          <v-btn variant="text" href="#plans">Planos</v-btn>
          <v-btn variant="text" to="/contato">Contato</v-btn>
          <v-btn
            color="primary"
            class="ml-4"
            rounded="lg"
            to="/acessar"
          >
            Acessar Sistema
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none"></v-app-bar-nav-icon>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
.v-application {
  font-family: 'Inter', sans-serif !important;
}

html {
  scroll-behavior: smooth;
}
</style>