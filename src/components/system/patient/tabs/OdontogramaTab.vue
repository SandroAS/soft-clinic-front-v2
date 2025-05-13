<script setup lang="ts">
import { reactive } from 'vue'
import TeethFaces from '@/components/system/patient/tabs/TeethFaces.vue'

const teethsTop = ['18','17','16','15','14','13','12','11','21','22','23','24','25','26','27','28']
const teethsBottom = ['48','47','46','45','44','43','42','41','31','32','33','34','35','36','37','38']

const selectedFaces = reactive<Record<string, Record<string, boolean>>>({})

function toggleFace(tooth: string, face: string) {
  if (!selectedFaces[tooth]) {
    selectedFaces[tooth] = {}
  }
  selectedFaces[tooth][face] = !selectedFaces[tooth][face]
}

const toothImages = import.meta.glob('@/assets/images/teeths/*.png', { eager: true, import: 'default' })

function getToothImage(tooth: string): string {
  return toothImages[`/src/assets/images/teeths/${tooth}.png`] as string
}
</script>

<template>
  <div class="d-flex flex-column align-center ga-6">

    <!-- Linha superior -->
    <div class="d-flex ga-2">
      <div v-for="tooth in teethsTop" :key="tooth" class="d-flex flex-column align-center">
        <img
          class="tooth-image elevation-5 rounded-lg bg-white mb-2"
          :src="getToothImage(tooth)"
          :alt="`Dente ${tooth}`"
        />
        <TeethFaces
          :selectedFaces="selectedFaces[tooth] || {}"
          @face-clicked="(face) => toggleFace(tooth, face)"
        />
        <span class="text-caption mt-1">{{ tooth }}</span>
      </div>
    </div>

    <!-- Linha inferior -->
    <div class="d-flex ga-2">
      <div v-for="tooth in teethsBottom" :key="tooth" class="d-flex flex-column align-center">
        <span class="text-caption mb-1">{{ tooth }}</span>
        <TeethFaces
          :selectedFaces="selectedFaces[tooth] || {}"
          @face-clicked="(face) => toggleFace(tooth, face)"
        />
        <img
          class="tooth-image elevation-5 rounded-lg bg-white my-2"
          :src="getToothImage(tooth)"
          :alt="`Dente ${tooth}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooth-image:hover {
  transform: scale(1.1);
  cursor: pointer;
  z-index: 1;
}
.tooth-image {
  transition: transform 0.2s ease;
}
</style>