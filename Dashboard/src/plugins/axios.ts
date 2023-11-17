import type { App } from 'vue'
import Axios from 'axios'

const axios = {

    async install(app: App) {
        //axios defaults
        Axios.defaults.baseURL = `${process.env.API_PATH}:${process.env.API_PORT}`
        app.config.globalProperties.$axios = Axios
    }
};


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof Axios;
  }
}

export default axios