<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AvatarMenu from '@/components/system/navbar/AvatarMenu.vue'
import NavBarLogo from '@/components/system/navbar/NavBarLogo.vue'
import NotificationMenu from '@/components/system/navbar/NotificationMenu.vue'
import SideBarMenu from '@/components/system/sidebar/SideBarMenu.vue'
import Toast from '@/components/system/Toast.vue'

const drawer = ref(true)
const rail = ref(false)
const isMobile = ref(false)

// Simulação de estado de teste gratuito
const isTrial = ref(true)
const trialDaysLeft = ref(7)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) drawer.value = false
}

const appBarIcon = computed(() => {
  return isMobile.value ? 'mdi-menu' : (rail.value ? 'mdi-chevron-right-box-outline': 'mdi-chevron-left-box-outline')
})

function toggleAppBarIcon() {
  if (isMobile.value) {
    drawer.value = !drawer.value
  } else {
    rail.value = !rail.value
  }
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})
</script>

<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon
      :icon="appBarIcon"
      @click="toggleAppBarIcon"
    />

    <NavBarLogo />

    <v-spacer />

    <NotificationMenu />
    <AvatarMenu />
  </v-app-bar>

  <SideBarMenu
    v-model="drawer"
    :rail="rail"
    :is-mobile="isMobile"
  />

  <v-main>
    <div class="v-toolbar v-toolbar--density-compact elevation-3 bg-white">
      <v-alert
        v-if="isTrial"
        type="warning"
        class="rounded-0 w-100"
        border="bottom"
        density="compact"
        variant="tonal"
      >
        <div
          class="d-flex align-center justify-space-between flex-wrap"
          :class="{ 'flex-column': isMobile }"
        >
          <span class="mb-2" v-if="isMobile">
            Você está em período de avaliação gratuita, finaliza em
            <strong>{{ trialDaysLeft }}</strong> dias.
          </span>
          <span v-else>
            Você está em período de avaliação gratuita, finaliza em
            <strong>{{ trialDaysLeft }}</strong> dias.
          </span>

          <v-btn
            color="warning"
            variant="flat"
            class="text-no-wrap"
            :class="isMobile ? 'w-100' : 'ml-4'"
            size="small"
            @click="() => $router.push('/assinatura')"
          >
            Assinar agora
          </v-btn>
        </div>
      </v-alert>
    </div>

    <v-container fluid class="pa-4">
      <router-view />
    </v-container>
  </v-main>

  <Toast />
</template>