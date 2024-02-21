<script setup>
// Importerar 'onMounted' från Vue, används för att köra kod efter att komponenten har monterats.
import { onMounted } from 'vue';
// Importerar 'useNasaStore' för att använda globalt tillståndshantering för NASAs API.
import { useNasaStore } from '@/stores/nasaStore';
// Importerar komponenten 'AstronomyImageDetails' för att visa detaljer om NASAs astronomibild.
import AstronomyImageDetails from '@/components/AstronomyImageDetails.vue';

// Använder 'useNasaStore' för att skapa en instans av nasaStore.
const nasaStore = useNasaStore();
// Definierar en apiKey som används för att autentisera anrop till NASAs API.
const apiKey = '56dHYtRIrVBa7FjpJkTa3tumbEOAZbaAUh2YXG3c';

// Funktion som körs när en bild klickas, loggar om bilden är förstorad eller i normalstorlek.
function onImageClicked(isEnlarged) {
  console.log('Bilden är nu', isEnlarged ? 'förstorad' : 'normalstorlek');
}

// 'onMounted' hook som körs när komponenten har monterats, anropar 'fetchAstronomyPicture' i nasaStore.
onMounted(() => {
  nasaStore.fetchAstronomyPicture(apiKey);
});
</script>


<template>
  <div class="apod-container">
    <h1 class="title">Astronomy Picture of the Day</h1>
    <!-- Visar en laddningstext när data laddas -->
    <div v-if="nasaStore.loading" class="loading">Laddar data...</div>
    <!-- Visar ett felmeddelande om det finns något fel -->
    <div v-else-if="nasaStore.error" class="error">{{ nasaStore.error }}</div>
    <!-- Visar bildinformation om data finns tillgänglig -->
    <div v-else-if="nasaStore.apodData" class="image-container">
      <AstronomyImageDetails :title="nasaStore.apodData.title" :explanation="nasaStore.apodData.explanation"
        :imageUrl="nasaStore.apodData.url" @imageClicked="onImageClicked" />
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
