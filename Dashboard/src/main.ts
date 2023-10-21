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

// Init Vue
const app = createApp(App)

//axios defaults
axios.defaults.baseURL = 'http://localhost:3001'
app.config.globalProperties.$axios = axios

// Init keycloak
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
        const refreshed = await keycloak.updateToken(70)
        if(refreshed) console.log('Token refreshed')
        else console.log(`Token not refreshed, valid for ${Math.round((keycloak?.tokenParsed?.exp || 0) - (keycloak?.timeSkew || 0) - new Date().getTime() / 1000)}s`)
      }, 60000)
    app.config.globalProperties.$keycloak = keycloak
    app.config.globalProperties.$user = await keycloak.loadUserProfile()
} catch (error) {
    console.error(error)
}

// Init API
const apiConfig = { url: "http://localhost:19199" }
try {
     
    let user = await axios.post(apiConfig.url, {"query":"query Query($uuid: String!) { user(uuid: $uuid) { uuid age img imgFormat } }","variables":{"uuid": app.config.globalProperties.$user.id},"operationName":"Query"})
    if (user?.status === 200) {
        if (user.data.data.user) {
            app.config.globalProperties.$user = lodash.merge(app.config.globalProperties.$user, user.data.data.user)
        }
        else {
            user = await axios.post(apiConfig.url, {"query":"mutation Create($uuid: String!) { create(uuid: $uuid, age: null, img: null, imgFormat: null) { uuid age img imgFormat } }","variables":{ "uuid": app.config.globalProperties.$user.id },"operationName":"Create"})
            if (user?.status === 200) {
                app.config.globalProperties.$user = lodash.merge(app.config.globalProperties.$user, user.data.data.create)
            }
            else {
                throw new Error(`Could not create User Profile in MongoDB`)
            }
        }
    }
    else throw new Error(`Error could not get User data from ${app.config.globalProperties.$user.id}`)
    app.config.globalProperties.$api = apiConfig
} catch (error) {
    console.error(error)
}

// Init lodash
app.config.globalProperties.$lodash = lodash

registerPlugins(app)

app.mount('#app')
app.use(VueApexCharts)