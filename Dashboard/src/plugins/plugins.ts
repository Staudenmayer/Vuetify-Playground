import type { App } from 'vue'
import lodash from 'lodash';

const plugins = {

    async install(app: App) {
        app.config.globalProperties.$lodash = lodash
    }
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $lodash: typeof lodash;
  }
}

export default plugins