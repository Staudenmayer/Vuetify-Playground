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
import Keycloak from 'keycloak-js'
import lodash from 'lodash';

const keycloakConfig = {
    url: 'http://localhost:8080',
    realm: 'App',
    clientId: 'UI'
}
const keycloak = new Keycloak(keycloakConfig);
try {
    const auth = await keycloak.init({onLoad: 'login-required', checkLoginIframe: false})
    if(!auth) window.location.reload()
    else console.log("Authenticated")

    if(keycloak.token) localStorage.setItem('vue-token', keycloak.token)
    if(keycloak.refreshToken) localStorage.setItem("vue-refresh-token", keycloak.refreshToken)

    setInterval(async () =>{
        let refreshed = await keycloak.updateToken(70)
        if(refreshed) console.log('Token refreshed')
        else console.log(`Token not refreshed, valid for ${Math.round((keycloak?.tokenParsed?.exp || 0) - (keycloak?.timeSkew || 0) - new Date().getTime() / 1000)}s`)
      }, 60000)
} catch (error) {
    console.error(error)
}


axios.defaults.baseURL = 'http://localhost:3001'

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$keycloak = keycloak
app.config.globalProperties.$user = await keycloak.loadUserProfile()
app.config.globalProperties.$lodash = lodash;

registerPlugins(app)

app.mount('#app')
app.use(VueApexCharts)