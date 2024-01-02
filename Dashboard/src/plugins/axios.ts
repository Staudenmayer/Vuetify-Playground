import type { App } from 'vue'
import Axios from 'axios'

const axios = {

    async install(app: App) {
        //axios defaults
        Axios.defaults.baseURL = `${import.meta.env.VITE_API_PATH}:${import.meta.env.VITE_API_PORT}`
        app.config.globalProperties.$axios = Axios
    }
};


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof Axios;
  }
}

export default axios