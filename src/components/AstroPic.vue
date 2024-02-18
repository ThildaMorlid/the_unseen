<script setup>
import { onMounted } from 'vue';
import { useNasaStore } from '@/stores/nasaStore';

const nasaStore = useNasaStore();
const apiKey = '56dHYtRIrVBa7FjpJkTa3tumbEOAZbaAUh2YXG3c';

onMounted(() => {
  nasaStore.fetchAstronomyPicture(apiKey);
});
</script>

<template>
  <div class="apod-container">
    <h1 class="title">Astronomy Picture of the Day</h1>
    <div v-if="nasaStore.loading" class="loading">Laddar data...</div>
    <div v-else-if="nasaStore.error" class="error">{{ nasaStore.error }}</div>
    <div v-else-if="nasaStore.apodData" class="image-container">
      <img :src="nasaStore.apodData.url" alt="Astronomy Picture of the Day" class="apod-image" />
      <div class="image-details">
        <h2>{{ nasaStore.apodData.title }}</h2>
        <p>{{ nasaStore.apodData.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apod-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #C9C5BE;
  color: #1E0A0A;
  width: 100%;
  box-sizing: border-box;
}

.title {
  font-size: 2.5rem;
  margin: 20px 0;
  width: 80%;
  text-align: center;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  /* Ökar maxbredden för att bättre utnyttja utrymmet på större skärmar */
}

.apod-image {
  width: 100%;
  max-width: 600px;
  /* Justerar maxbredden för bilden för att förhindra att den blir för stor */
  border-radius: 8px;
  margin-bottom: 20px;
}

.image-details {
  width: 100%;
  max-width: 600px;
  /* Justerar maxbredden för textområdet för att matcha bilden */
  text-align: justify;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.loading {
  font-size: 1.5rem;
  color: #1E0A0A;
}

@media (min-width: 768px) {
  .apod-container {
    flex-direction: row;
    justify-content: space-around;
    /* Ändrar till space-around för att ge utrymme mellan bild och text */
    align-items: flex-start;
    flex-wrap: wrap;
    /* Tillåter innehållet att omslutas vid behov */
  }

  .image-container,
  .image-details {
    width: 90%;
    /* Justerar bredden för att tilldela lika utrymme till bild och text */
    margin: 20px;
    /* Lägger till ytterligare marginal för att skapa utrymme */
  }
}
</style>
