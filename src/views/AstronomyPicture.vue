<template>
  <div>
    <h1>Astronomy Picture of the Day</h1>
    <div v-if="imageData">
      <h2>{{ imageData.title }}</h2>
      <img :src="imageData.url" :alt="imageData.title" />
      <p>{{ imageData.explanation }}</p>
    </div>
    <div v-else>
      <p>Laddar bild...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageData: null,
    };
  },
  created() {
    this.fetchAstronomyPicture();
  },
  methods: {
    async fetchAstronomyPicture() {
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
