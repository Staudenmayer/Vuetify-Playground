import type { App } from 'vue'
import Axios from 'axios'

let axios = {

    async install(app: App) {
        //axios defaults
        Axios.defaults.baseURL = 'http://localhost:19199'
        app.config.globalProperties.$axios = Axios
    }
};

export default axios