<script setup lang="ts">

const props = defineProps<{
  selectedFaces: Record<string, boolean>
}>()

const emit = defineEmits<{
  (e: 'face-clicked', face: string): void
}>()

function emitFace(face: string) {
  emit('face-clicked', face)
}

function faceClass(face: string) {
  return [
    'rounded-sm',
    'border',
    props.selectedFaces[face] ? 'bg-blue-lighten-2' : 'bg-white'
  ]
}
</script>

<template>
  <div class="elevation-5 teeth-face">
    <!-- Esquerda -->
    <div
      :class="faceClass('esquerda')"
      class="teeth-face-left"
      @click.stop="emitFace('esquerda')"
    ></div>

    <div style="justify-items: center">
      <!-- Superior -->
      <div
        :class="faceClass('superior')"
        class="teeth-face-up"
        @click.stop="emitFace('superior')"
      ></div>

      <!-- Centro -->
      <div
        :class="faceClass('frontal')"
        class="teeth-face-middle"
        @click.stop="emitFace('frontal')"
      ></div>

      <!-- Inferior -->
      <div
        :class="faceClass('inferior')"
        class="teeth-face-bottom"
        @click.stop="emitFace('inferior')"
      ></div>
    </div>

    <!-- Direita -->
    <div
      :class="faceClass('direita')"
      class="teeth-face-right"
      @click.stop="emitFace('direita')"
    ></div>
  </div>
</template>

<style scoped>
.teeth-face {
  border: 1px solid transparent;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.teeth-face-left {
  width: 6px;
  height: 22px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 2px;
}

.teeth-face-up {
  width: 22px;
  height: 6px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 5px;
}

.teeth-face-middle {
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}

.teeth-face-bottom {
  width: 22px;
  height: 6px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.teeth-face-right {
  width: 6px;
  height: 22px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-left: 2px;
}

.teeth-face-left:hover,
.teeth-face-up:hover,
.teeth-face-middle:hover,
.teeth-face-bottom:hover,
.teeth-face-right:hover {
  transform: scale(1.3);
  cursor: pointer;
  z-index: 1;
}

.teeth-face-left,
.teeth-face-up,
.teeth-face-middle,
.teeth-face-bottom,
.teeth-face-right {
  transition: transform 0.2s ease;
}
</style>