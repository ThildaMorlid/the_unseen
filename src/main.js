import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Lägger in Bootstrap CSS stilar

import 'bootstrap/dist/css/bootstrap.css'

// Importera Bootstrap JS filer

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// för att import ska fungera så behöver vi anv dessa med ett middleware "use"

app.use(bootstrap)

app.mount('#app')
