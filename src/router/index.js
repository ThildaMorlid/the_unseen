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
      component: AstronomyPicture,
    },
    {
      path: '/nasa-library',
      name: 'NasaLibrary',
      component: NasaLibrary,
    },
    {

      path: '/nasa-library/:id',
      name: 'NasaLibraryDetail',
      component: () => import('../views/NasaLibraryDetail.vue') 
    }
  ]
});

export default router;
