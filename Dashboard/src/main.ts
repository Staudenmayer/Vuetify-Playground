/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

const app = createApp(App)

app.config.globalProperties.$axios = axios

registerPlugins(app)

app.mount('#app')
app.use(VueApexCharts)

//https://hevodata.com/learn/vue-js-mongodb/
