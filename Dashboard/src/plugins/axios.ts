import type { App } from 'vue'
import Axios from 'axios'

const axios = {

    async install(app: App) {
        //axios defaults
        Axios.defaults.baseURL = 'http://localhost:19199'
        app.config.globalProperties.$axios = Axios
    }
};


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof Axios;
  }
}

export default axios