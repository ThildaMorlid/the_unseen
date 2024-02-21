<template>
  <!-- Huvudcontainer för NASA-biblioteket -->
  <div class="nasa-library">
    <!-- Sidans titel -->
    <h1>NASA Image and Video Library</h1>

    <!-- Sökbaren -->
    <div class="search-bar">
      <!-- Sökfältet binder dess värde till 'searchQuery' och triggar 'fetchImages' när Enter trycks -->
      <input v-model="searchQuery" @keyup.enter="fetchImages" placeholder="Skriv något om rymden" class="search-input">
      <!-- Sökknapp som också triggar 'fetchImages' -->
      <button @click="fetchImages" class="search-button button">Sök</button>
    </div>

    <!-- Visar att det laddas när bilder hämtas -->
    <div v-if="loading" class="loading">Laddar...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Loopar igenom hämtade bilder och visar dem -->
    <div v-for="item in paginatedItems" :key="item.data[0].nasa_id" class="item">
      <!-- Varje artikel kan klickas på för att navigera till detaljsidan med 'goToDetailPage' -->
      <div @click="goToDetailPage(item.data[0].nasa_id)" class="item-content">
        <h3>{{ item.data[0].title }}</h3>
        <!-- Visar bild om den finns -->
        <img v-if="item.links" :src="item.links[0].href" :alt="item.data[0].title" class="image" />
        <p>{{ item.data[0].description }}</p>
        <!-- Knapp för att visa detaljer - visuellt hjälpmedel för användaren -->
        <button class="detail-button button">Visa artikel ID</button>
      </div>
    </div>

    <!-- En knapp för att ladda fler bilder om det finns fler att visa -->
    <div class="button-container" v-if="items.length > paginatedItems.length">
      <button @click="loadMore" class="load-more-button button">Ladda fler</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Importerar axios för HTTP-förfrågningar

export default {
  setup() {
    // Definierar reaktiva dataegenskaper
    const searchQuery = ref('');
    const items = ref([]);
    const itemCount = ref(10);
    const loading = ref(false);
    const error = ref('');
    const router = useRouter(); // Använder Vue Router för navigation

    // Funktion för att hämta bilder baserat på söksträng
    const fetchImages = async () => {
      if (!searchQuery.value) {
        error.value = "Sök efter något relaterat till rymden";
        return;
      }
      loading.value = true;
      error.value = '';
      try {
        const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery.value)}`);
        items.value = response.data.collection.items;
      } catch (err) {
        console.error("Error fetching images: ", err);
        error.value = 'Kunde inte hämta bilder. Försök igen senare.';
      } finally {
        loading.value = false;
      }
    };

    // Navigerar till detaljsidan för en artikel baserat på dess ID
    const goToDetailPage = (nasaId) => {
      router.push({ name: 'NasaLibraryDetail', params: { id: nasaId } });
    };

    // Läser in fler bilder när användaren klickar på "Ladda fler"-knappen
    const loadMore = () => {
      itemCount.value += 10;
    };

    // Bevakar förändringar i 'searchQuery' och hämtar nya bilder vid förändring
    watch(searchQuery, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        fetchImages();
      }
    }, { immediate: true });

    const paginatedItems = computed(() => {
      return items.value.slice(0, itemCount.value);
    });

    return {
      searchQuery,
      items,
      itemCount,
      loading,
      error,
      paginatedItems,
      fetchImages,
      goToDetailPage,
      loadMore
    };
  }
};
</script>



<style scoped>
/* Grundläggande stil för hela biblioteksdelen */
.nasa-library {
  margin-top: 80px;
  /* Ger utrymme mellan navbar och innehåll */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* Responsiv grid layout */
  gap: 20px;
  /* Utrymme mellan grid-element */
  padding: 20px;
  /* Padding runt innehållet */
  color: #1E0A0A;
  /* Textfärg */
}

/* Stil för varje artikel/item */
.item {
  background-color: #fff;
  /* Bakgrundsfärg för artiklar */
  padding: 20px;
  /* Padding inuti artiklar */
  border: 1px solid #ddd;
  /* Ram runt artiklar */
  margin-bottom: 20px;
  /* Utrymme under artiklar */
  display: flex;
  flex-direction: column;
  max-height: 600px;
  /* Maxhöjd för artikeln */
  overflow: hidden;
  /* Döljer innehåll som överskrider maxhöjden */
}

/* Stil för sökfält och knapp */
.search-bar {
  display: flex;
  justify-content: center;
  /* Centrerar sökfält och knapp */
  margin-bottom: 20px;
  /* Utrymme under sökfältet */
  width: 100%;
  max-width: 600px;
  /* Begränsar bredden för att förhindra att den blir för stor */
}

.search-input,
.search-button {
  height: 40px;
  /* Standardhöjd för att förhindra storleksändring */
}

.search-input {
  flex-grow: 1;
  /* Låter sökfältet expandera och ta upp tillgängligt utrymme */
  margin-right: 10px;
  /* Utrymme mellan sökfält och sökknapp */
  border: 2px solid #1E0A0A;
  /* Ramfärg */
}

/* Gemensam stil för knappar */
.search-button,
.load-more-button {
  white-space: nowrap;
  /* Förhindrar textbrottning */
}

/* Stil för bilder */
.image {
  max-width: 100%;
  height: auto;
  /* Automatisk höjd baserat på bredden */
  border-radius: 8px;
  /* Rundade hörn */
}

/* Artikeltext med skroll */
.item p {
  overflow-y: auto;
  /* Aktiverar vertikal skrollning */
  max-height: 200px;
  /* Maxhöjd för texten */
  margin-top: 20px;
  /* Utrymme ovanför texten */
}


/* Extra marginal under 'Ladda fler'-knappen */
.button-container {
  margin-bottom: 40px;
  /* Justera detta värde efter behov */
}

.item-content:hover {
  background-color: #f5f5f5; /* Ljusgrå bakgrund vid hover */
  cursor: pointer; /* Ändrar muspekaren till en pekande hand */
}


</style>
