<template>
  <!-- Container för hela Astronomy Picture of the Day-delen -->
  <div class="apod-container">
    <!-- Titel på sidan -->
    <h1 class="title">Astronomy Picture of the Day</h1>
    <!-- Kontrollerar om imageData finns -->
    <div v-if="imageData" class="image-container">
      <!-- Visar bilden om imageData laddats -->
      <img :src="imageData.url" :alt="imageData.title" class="apod-image" />
      <!-- Container för bildens titel och förklaring -->
      <div class="image-details">
        <h2>{{ imageData.title }}</h2>
        <p>{{ imageData.explanation }}</p>
      </div>
    </div>
    <!-- Visas medan bildens data laddas -->
    <div v-else class="loading">
      <p>Laddar bild...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importerar axios för HTTP-anrop

export default {
  data() {
    return {
      imageData: null, // Data för dagens astronomibild
    };
  },
  created() {
    this.fetchAstronomyPicture(); // Anropar metoden direkt när komponenten skapas
  },
  methods: {
    async fetchAstronomyPicture() {
      // Försöker hämta bildens data från API
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=56dHYtRIrVBa7FjpJkTa3tumbEOAZbaAUh2YXG3c`);
        this.imageData = response.data;
      } catch (error) {
        console.error("Det gick inte att hämta bilden: ", error);
      }
    },
  },
};
</script>

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
