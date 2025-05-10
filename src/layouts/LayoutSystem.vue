<script setup lang="ts">
import AvatarMenu from '@/components/system/navbar/AvatarMenu.vue'
import NavBarLogo from '@/components/system/navbar/NavBarLogo.vue'
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
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        :icon="appBarIcon"
        @click="toggleAppBarIcon"
      />

      <NavBarLogo />

      <v-spacer />

      <AvatarMenu />
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
