import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useNasaStore = defineStore('nasa', () => {
  const apodData = ref(null); // APOD = Astronomy Picture of the Day
  const loading = ref(false);
  const error = ref('');

  async function fetchAstronomyPicture(apiKey) {
    loading.value = true;
    error.value = '';
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      apodData.value = response.data;
    } catch (err) {
      console.error("Error fetching APOD data:", err);
      error.value = 'Failed to fetch data. Please try again later.';
    } finally {
      loading.value = false;
    }
  }

  return { apodData, loading, error, fetchAstronomyPicture };
});
