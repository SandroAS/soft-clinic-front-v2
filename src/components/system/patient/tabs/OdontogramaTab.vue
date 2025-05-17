<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import TeethFaces from '@/components/system/patient/tabs/TeethFaces.vue'
import OdontogramaAnnotations from '../odontograma/OdontogramaAnnotations.vue'

type Face = 'esquerda' | 'direita' | 'superior' | 'inferior' | 'frontal'

interface SelectedTooth {
  tooth: string | null
  face: Face | null
}

interface Annotation {
  tooth: number
  face: Face
  color: string
  category: string
  note: string
  createdAt: Date
}

const teethsTop = ['18','17','16','15','14','13','12','11','21','22','23','24','25','26','27','28']
const teethsBottom = ['48','47','46','45','44','43','42','41','31','32','33','34','35','36','37','38']

const selectedFaces = reactive<Record<string, Record<string, boolean>>>({})

const selectedTooth = reactive<SelectedTooth>({
  tooth: null,
  face: null,
})

function toggleFace(tooth: string, face: Face) {
  selectedTooth.tooth = tooth
  selectedTooth.face = face
  selectedFaces[tooth] = { [face]: true }
}

const toothImages = import.meta.glob('@/assets/images/teeths/*.png', { eager: true, import: 'default' })

function getToothImage(tooth: string): string {
  return toothImages[`/src/assets/images/teeths/${tooth}.png`] as string
}

const categories = {
  DENTE: [
    { label: 'Prótese', color: '#BDBDBD' },
    { label: 'Resina', color: '#FFC107' },
    { label: 'Ausente', color: '#9E9E9E' },
    { label: 'Canal Tratado', color: '#2196F3' },
  ],
  FACE: [
    { label: 'Cariado', color: '#D32F2F' },
  ]
}

const selectedCategory = ref('')
const note = ref('')

function selectTooth(tooth: string) {
  selectedTooth.tooth = tooth
  selectedTooth.face = null
}

const isFaceSelected = computed(() => selectedTooth.face !== null)
const availableCategories = computed(() =>
  isFaceSelected.value ? categories.FACE : categories.DENTE
)

function getTechnicalToothFaceName(code: string, face: Face): string {
  if (!code || !face) return ''

  const tooth = parseInt(code)

  const leftSide = new Set([18, 17, 16, 15, 14, 13, 12, 11, 48, 47, 46, 45, 44, 43, 42, 41])
  const rightSide = new Set([21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38])
  const topSide = new Set([18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28])
  const bottomSide = new Set([48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38])
  const oclusal = new Set([18, 17, 16, 15, 14, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 34, 35, 36, 37, 38])
  const incisal = new Set([13, 12, 11, 21, 22, 23, 43, 42, 41, 31, 32, 33])

  const faceMap: Record<Face, () => string> = {
    esquerda: () => leftSide.has(tooth) ? 'distal' : rightSide.has(tooth) ? 'mesial' : '',
    direita: () => leftSide.has(tooth) ? 'mesial' : rightSide.has(tooth) ? 'distal' : '',
    superior: () => topSide.has(tooth) ? 'palatal' : bottomSide.has(tooth) ? 'lingual' : '',
    inferior: () => 'vestibular',
    frontal: () => oclusal.has(tooth) ? 'oclusal' : incisal.has(tooth) ? 'incisal' : ''
  }

  return faceMap[face]?.() ?? ''
}

const annotations = ref<Annotation[]>([
  {
    tooth: 11,
    face: 'frontal',
    category: 'Cárie',
    note: 'Presença de cárie visível',
    color: 'red',
    createdAt: new Date()
  },
  {
    tooth: 12,
    face: 'frontal',
    category: 'Cárie',
    note: 'Presença de cárie visível',
    color: 'red',
    createdAt: new Date()
  }
])

function getToothStyle(tooth: string) {
  const isSelected = selectedTooth.tooth === tooth && !selectedTooth.face
  if (isSelected) return { backgroundColor: '#BBDEFB' }

  const hasAnnotation = annotations.value.some(a => a.tooth === Number(tooth) && !a.face)
  if (hasAnnotation) {
    const firstAnnotation = annotations.value.find(a => a.tooth === Number(tooth) && !a.face)
    return { backgroundColor: firstAnnotation?.color || 'transparent' }
  }

  return { backgroundColor: 'white' }
}
</script>

<template>
  <div class="d-flex justify-space-between">
    <!-- ODONTOGRAMA -->
    <div class="d-flex flex-column align-center ga-6">
      <!-- LINHA SUPERIOR -->
      <div class="d-flex ga-2">
        <div
          v-for="tooth in teethsTop"
          :key="tooth"
          class="d-flex flex-column align-center"
        >
          <img
            class="tooth-image elevation-5 rounded-lg my-2"
            :style="getToothStyle(tooth)"
            :src="getToothImage(tooth)"
            :alt="`Dente ${tooth}`"
            @click="selectTooth(tooth)"
          />
          <TeethFaces
            :selectedFaces="selectedFaces[tooth] || {}"
            :tooth="tooth"
            :selectedTooth="selectedTooth"
            :annotations="annotations"
            @face-clicked="(face) => toggleFace(tooth, face)"
          />
          <span class="text-caption mt-1">{{ tooth }}</span>
        </div>
      </div>

      <!-- LINHA INFERIOR -->
      <div class="d-flex ga-2">
        <div
          v-for="tooth in teethsBottom"
          :key="tooth"
          class="d-flex flex-column align-center"
        >
          <span class="text-caption mb-1">{{ tooth }}</span>
          <TeethFaces
            :selectedFaces="selectedFaces[tooth] || {}"
            :tooth="tooth"
            :selectedTooth="selectedTooth"
            :annotations="annotations"
            @face-clicked="(face) => toggleFace(tooth, face)"
          />
          <img
            class="tooth-image elevation-5 rounded-lg my-2"
            :style="getToothStyle(tooth)"
            :src="getToothImage(tooth)"
            :alt="`Dente ${tooth}`"
            @click="selectTooth(tooth)"
          />
        </div>
      </div>
    </div>

    <!-- FORMULÁRIO LATERAL -->
    <v-card class="ml-10 pa-4 mr-2" min-width="300">
      <h3 class="text-h6 mb-4">
        Anotação para:
        <template v-if="selectedTooth.tooth">
          {{ selectedTooth.tooth }}
          <span v-if="selectedTooth.face">
            ({{ getTechnicalToothFaceName(selectedTooth.tooth, selectedTooth.face) }})
          </span>
        </template>
      </h3>

      <v-textarea
        label="Anotação"
        v-model="note"
        rows="3"
        class="mb-4"
        variant="solo-filled"
        density="comfortable"
      />

      <div class="mb-2">Categoria:</div>
      <v-radio-group v-model="selectedCategory">
        <v-radio
          v-for="cat in availableCategories"
          :key="cat.label"
          :label="cat.label"
          :value="cat.label"
          :color="cat.color"
        />
      </v-radio-group>
    </v-card>
  </div>

  <OdontogramaAnnotations
    :annotations="annotations"
    @delete="annotations.splice($event, 1)"
  />
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
.v-card {
  max-height: 400px;
}
</style>