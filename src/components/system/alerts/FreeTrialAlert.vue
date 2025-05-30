<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isMobile: boolean
}>()

// Simulação de estado de teste gratuito
const isTrial = ref(true)
const trialDaysLeft = ref(7)
</script>

<template>
  <div class="v-toolbar v-toolbar--density-compact bg-white">
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
</template>