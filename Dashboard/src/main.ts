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
import lodash from 'lodash';

// Init Vue
const app = createApp(App)

// Init API
/*
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
*/

// Init lodash
app.config.globalProperties.$lodash = lodash

registerPlugins(app)

app.mount('#app')
app.use(VueApexCharts)