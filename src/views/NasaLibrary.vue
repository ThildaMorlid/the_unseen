<template>
  <div class="nasa-library">
    <!-- Sidans Titel -->
    <h1>NASA Image and Video Library</h1>

    <!-- Sökbaren -->
    <div class="search-bar">
      <input v-model="searchQuery" @keyup.enter="fetchImages" placeholder="Search for images" class="search-input">
      <button @click="fetchImages" class="search-button">Search</button>
    </div>

    <!-- Laddningsindikator och Felmeddelanden -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Artiklar som Hämtas från API -->
    <div v-for="item in paginatedItems" :key="item.data[0].nasa_id" class="item">
      <h3>{{ item.data[0].title }}</h3>
      <img v-if="item.links" :src="item.links[0].href" :alt="item.data[0].title" class="image" />
      <p>{{ item.data[0].description }}</p>
    </div>

    <!-- "Ladda fler"-knapp -->
    <div class="button-container" v-if="items.length > paginatedItems.length">
      <button @click="loadMore" class="load-more-button">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importerar axios för att göra ett HTTP anrop

export default {
  data() {
    // Datafunktionen returnerar ett objekt
    return {
      searchQuery: '', // Lagrar söksträng från anv
      items: [], // En array för att lagra sök resultat
      itemCount: 10, // Antal artiklar som visas i taget
      loading: false, // En flagga för att visa laddningen
      error: '' // en sträng för att visa felmeddelande
    };
  },
  computed: {
    // Beräknade egenskaper
    paginatedItems() {
      // Visas en del av 'items' baserat på 'itemcount'
      return this.items.slice(0, this.itemCount);
    }
  },
  watch: {
    // En "watch" som lyssnar på förändring i searchQuery
    searchQuery: {
      handler(newVal, oldVal) {
        // funktion som körs varje gång 'searchQuery' ändras
        if (newVal !== oldVal) {
          this.fetchImages(); // Anropa 'fetchImages' för att uppdatera sökresultatet
        }
      },
      immediate: true, // Kör handler direkt vid start
    }
  },
  methods: {
    async fetchImages() {
      // Asynkron funktion för att hämta bilder baserat på vad anv skriver
      if (!this.searchQuery) {
        this.error = "Sök efter något spaceat";
        return;
      }
      this.loading = true; // visar laddningsindikatorn
      this.error = ''; // rensa tidigare felmeddelenaden
      try {
        // HTTP anrop till nasas bild-API
        const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(this.searchQuery)}`);
        this.items = response.data.collection.items;
      } catch (error) {
        console.error("Error fetching images: ", error);
        this.error = 'Failed to fetch images. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      // funktionen för att ladda in fler artiklar
      this.itemCount += 10; //öka 'itemCount' med 10
    }
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

/* Stilar för laddningsindikator, felmeddelanden och 'inga resultat'-text */
.loading,
.error-message,
.no-results {
  text-align: center;
  /* Centrerar texten */
  margin-top: 20px;
  /* Utrymme ovanför */
}

/* Specifik stil för felmeddelanden */
.error-message {
  color: #FF0000;
  /* Röd färg för felmeddelanden */
}

/* Extra marginal under 'Ladda fler'-knappen */
.button-container {
  margin-bottom: 40px;
  /* Justera detta värde efter behov */
}
</style>
