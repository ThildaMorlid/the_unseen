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

.enlarged {
  transform: scale(2); /* Dubblar bildens storlek */
  cursor: zoom-out; /* Visar att bilden kan klickas för att återgå till normal storlek */
  z-index: 10; /* Ser till att bilden visas ovanpå andra element */
  position: relative; /* Nödvändigt för att z-index ska fungera korrekt */
}

.image-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;
}

h2, p {
    color: #1E0A0A;
 /* Enhällig textfärg för titel och beskrivning */
  max-width: 90%; /* Begränsar textens bredd för bättre läsbarhet på breda skärmar */
  margin: 20px 0; /* Ger utrymme mellan elementen */
}

p {
  line-height: 1.6; /* Ökar radavståndet */
}

.apod-image {
  transition: transform 0.3s ease; /* Gör övergången mjuk */
  cursor: zoom-in; /* Visar att bilden kan klickas för att förstoras */
  max-width: 100%; /* Ser till att bilden aldrig överskrider sin behållares bredd */
  border-radius: 8px; /* Behåller rundade hörn */
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1); /* Lägger till en subtil skugga för djup */
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
