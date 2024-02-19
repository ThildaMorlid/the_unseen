import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AstronomyPicture from '../views/AstronomyPicture.vue';
import NasaLibrary from '../views/NasaLibrary.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
    path: '/astronomy-picture',
    name: 'AstronomyPicture',
    component: AstronomyPicture, // route för Astronimic picture
  },
    {
      path: '/nasa-library',
      name: 'NasaLibrary',
      component: NasaLibrary, // route för Nasa Library
    }

  ]
})

export default router
