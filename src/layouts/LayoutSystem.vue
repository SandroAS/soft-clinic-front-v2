<script setup lang="ts">
import logo from '@/assets/logo.png'
import SideBarMenu from '@/components/system/sidebar/SideBarMenu.vue'
import { ref, computed, onMounted } from 'vue'

const drawer = ref(true)
const rail = ref(false)
const isMobile = ref(false)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) drawer.value = false
}

const appBarIcon = computed(() => {
  return isMobile.value ? 'mdi-menu' : (rail.value ? 'mdi-chevron-right-box-outline': 'mdi-chevron-left-box-outline')
})

function toggleAppBarIcon() {
  if(isMobile.value) {
    drawer.value = !drawer.value
  } else {
    rail.value = !rail.value
  }
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

import { useRouter } from 'vue-router'

const router = useRouter()

// Simulando dados do usuário logado
const usuario = {
  nome: 'Sandro Souza'
}

const nomeUsuario = 'Sandro Souza'
const emailUsuario = 'sandro.souza@email.com'

const siglaUsuario = computed(() => {
  const nomes = usuario.nome.trim().split(' ')
  if (nomes.length === 1) return nomes[0][0].toUpperCase()
  return `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
})

function irPara(path: string) {
  router.push(path)
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        :icon="appBarIcon"
        @click="toggleAppBarIcon"
      />

      <v-toolbar-title class="pl-2">
        <div class="d-flex justify-self-start align-center">
          <v-img :src="logo" alt="Logo Soft Clinic" contain height="50" width="50" class="mr-2" />
          <div>Soft Clinic</div>
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="ml-2 elevation-4 bg-white"
            variant="text"
            icon
          >
            <v-avatar size="36">
              <span class="text-primary text-subtitle-2">{{ siglaUsuario }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item class="mb-1">
            <template #prepend>
              <v-avatar color="primary" size="40">
                <span class="text-white text-subtitle-2">{{ siglaUsuario }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-2 font-weight-medium">{{ nomeUsuario }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">{{ emailUsuario }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item @click="irPara('/system/minha-conta')">
            <v-list-item-title>Minha conta</v-list-item-title>
          </v-list-item>
          <v-list-item @click="irPara('/system/configuracoes')">
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <template #append>
              <v-icon color="error" class="mr-2">mdi-logout</v-icon>
            </template>
            <v-list-item-title class="text-error">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <SideBarMenu
      v-model="drawer"
      :rail="rail"
      :is-mobile="isMobile"
    />

    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
