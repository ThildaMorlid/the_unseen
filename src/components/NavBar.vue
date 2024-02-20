<script setup>
// Importerar nödvändiga moduler och bibliotek
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <header>
    <nav id="navbarani" class="navbar bg-body tertiary fixed-top">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">UNSEEN</RouterLink>
        <!-- Uppdaterad knapp för canvasmeny med text "Meny" -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar">
          Meny
        </button>

        <!-- Offcanvas meny som ska visas -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Meny</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <!-- Offcanvas body här, lägg till innehåll eller länkar som behövs -->
          <div class="offcanvas-body">
            <RouterLink class="nav-link" to="/astronomy-picture">Astronomy Picture of the Day</RouterLink>
            <RouterLink class="nav-link" to="/nasa-library">Nasa Library</RouterLink>

            <!-- Länkar eller annat navigationsinnehåll kan läggas här -->
          </div>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
/* Stilar för navbaren */
.navbar {
  background-color: #C9C5BE !important;
  /* Grå bakgrundsfärg för navbaren */
  color: #1E0A0A;
  /* Bibehåller textfärgen */
}

/* Stilar för navbar-brand och nav-links */
.navbar-brand,
.nav-link {
  color: #1E0A0A;
}

/* Stilar för offcanvas-menyn */
.offcanvas {
  background-color: #B0ABA3 !important;
}

/* Stilar för offcanvas-header */

/* Stilar för offcanvas-body */
.offcanvas-body {
  color: #1E0A0A;
  /* Sätter textfärgen i offcanvas body */
}
</style>
