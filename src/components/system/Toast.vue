<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { useSnackbarStore } from '@/stores/snackbar.store'

const snackbar = useSnackbarStore()
const visibleToasts = ref<any[]>([])

const MAX_VISIBLE = 5
const DURATION = 4000
const TOAST_GAP = 56

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
  <div class="fixed top-4 right-4 z-50 w-[350px] pointer-events-none">
    <transition-group name="toast-fade" tag="div">
      <v-snackbar
        v-for="(toast, index) in visibleToasts"
        :key="toast.id"
        v-model="toast.active"
        :color="toast.color"
        :timeout="DURATION"
        location="top end"
        elevation="3"
        class="rounded w-full pointer-events-auto transition-all duration-300"
        :style="{ marginTop: `${index * TOAST_GAP}px` }"
      >
        <div class="text-sm font-medium">
          {{ toast.text }} {{ toast.id }}
        </div>
      </v-snackbar>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-fade-move,
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
</style>
