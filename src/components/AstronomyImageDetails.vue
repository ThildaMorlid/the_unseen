<script setup>
import { defineEmits, ref } from 'vue';

const props = defineProps({
  title: String,
  explanation: String,
  imageUrl: String,
});

const emit = defineEmits(['imageClicked']);

// En reaktiv referens för att hålla koll på om bilden är förstorad eller inte
const isEnlarged = ref(false);

function toggleImageSize() {
  isEnlarged.value = !isEnlarged.value;
  emit('imageClicked', isEnlarged.value); // Sänder ut ett anpassat event med bildens tillstånd
}
</script>

<template>
  <div class="image-details-container" @click="toggleImageSize">
    <img :src="imageUrl" :alt="title" class="apod-image" :class="{ enlarged: isEnlarged }" />
    <h2>{{ title }}</h2>
    <p>{{ explanation }}</p>
  </div>
</template>

<style scoped>
.apod-image {
  transition: transform 0.3s ease;
}

.enlarged {
  transform: scale(1.5);
  /* Förstorar bilden */
  cursor: pointer;
  /* Ändrar muspekaren för att indikera att bilden kan klickas */
}

.image-details-container:hover .apod-image {
  cursor: pointer;
}
</style>
