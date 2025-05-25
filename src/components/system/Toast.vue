<!-- src/components/system/Toast.vue -->
<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar.store'
const snackbar = useSnackbarStore()
</script>

<template>
  <v-snackbar-queue
    v-model="snackbar.messages"
    location="top end"
    class="z-50"
  />
</template>
