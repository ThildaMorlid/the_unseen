<script setup>
import { onMounted } from 'vue';
import { useNasaStore } from '@/stores/nasaStore';
import AstronomyImageDetails from '@/components/AstronomyImageDetails.vue';


const nasaStore = useNasaStore();
const apiKey = '56dHYtRIrVBa7FjpJkTa3tumbEOAZbaAUh2YXG3c';

function onImageClicked(isEnlarged) {
  console.log('Bilden är nu', isEnlarged ? 'förstorad' : 'normalstorlek');
}

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
          <AstronomyImageDetails
        :title="nasaStore.apodData.title"
        :explanation="nasaStore.apodData.explanation"
        :imageUrl="nasaStore.apodData.url"
        @imageClicked="onImageClicked"
      />
    </div>

  </div>

</template>

<style scoped>
.apod-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  color: #1E0A0A;
  width: 100%;
  box-sizing: border-box;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
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
}


.loading {
  font-size: 1.5rem;
  color: #1E0A0A;
}

@media (min-width: 768px) {
  .apod-container {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
  }

   .image-details {
    width: 90%;
    /* Justerar bredden för att tilldela lika utrymme till bild och text */
    margin: 20px;
    /* Lägger till ytterligare marginal för att skapa utrymme */
  }
}
</style>
