import type { App } from 'vue'
import Keycloak, { KeycloakConfig } from 'keycloak-js'

let keycloak = {

    async install(app: App) {
            // Init keycloak
        const keycloakConfig: KeycloakConfig = {
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
    }
  };
  
  export default keycloak