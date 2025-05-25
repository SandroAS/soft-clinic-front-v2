<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSnackbarStore } from '@/stores/snackbar.store'

const snackbar = useSnackbarStore()
const visibleToasts = ref<any[]>([])

const MAX_VISIBLE = 5
const DURATION = 4000

watch(
  () => snackbar.messages,
  () => {
    processQueue()
  },
  { deep: true }
)

function processQueue() {
  while (
    visibleToasts.value.length < MAX_VISIBLE &&
    snackbar.messages.length > 0
  ) {
    const next = snackbar.messages.shift()
    if (next) {
      visibleToasts.value.push(next)

      // Remove o toast após o tempo definido
      setTimeout(() => {
        const index = visibleToasts.value.findIndex((msg) => msg.id === next.id)
        if (index !== -1) visibleToasts.value.splice(index, 1)
        // Tenta adicionar o próximo da fila
        processQueue()
      }, DURATION)
    }
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-[350px]">
    <v-snackbar
      v-for="(toast, index) in visibleToasts"
      :key="toast.id"
      v-model="toast.active"
      :color="toast.color"
      timeout="4000"
      location="top end"
      elevation="3"
      class="rounded"
    >
      <div class="text-sm font-medium">
        {{ toast.text }}
      </div>
    </v-snackbar>
  </div>
</template>
