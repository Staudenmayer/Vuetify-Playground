import type { App } from 'vue'
import type { AxiosStatic } from 'axios'
import type { LoDashStatic } from 'lodash'
import Keycloak, { KeycloakConfig, KeycloakProfile } from 'keycloak-js'

interface ProfileDescriptor {
    id?: string;
    username?: string;
    firstName?:string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    userProfileMetadata?: Object;
    attributes?: Object;
    uuid?: string;
    age?: Number;
    img?: string;
    imgFormat?: string;
  }

class Profile{
    #app: App;
    #keycloak: Keycloak;
    #axios: AxiosStatic;
    #lodash: LoDashStatic;
    profile: ProfileDescriptor;

    constructor(app: App){
        this.#app = app;
        this.#keycloak = app.config.globalProperties.$keycloak;
        this.#axios = app.config.globalProperties.$axios;
        this.#lodash = app.config.globalProperties.$lodash;
        this.profile = {};
    }

    async init(){
        await this.refresh();
        return this.profile;
    }

    async refresh(){
        try {
            let keycloakUser:KeycloakProfile = await this.#keycloak.loadUserProfile();
            let apiUser:Object = await this.#loadAPIUser(keycloakUser.id);
            this.profile = this.#lodash.merge(keycloakUser, apiUser);
            return this.profile;
        } catch (error) {
            console.error(error)
        }
    }

    async #loadAPIUser(id: string | undefined){
        try {
            let user = await this.#axios.post("/", { "query": "query Query($uuid: String!) { user(uuid: $uuid) { uuid age img imgFormat } }", "variables": { "uuid": id }, "operationName": "Query" })
            if (user?.status === 200) {
                if (user.data.data.user) {
                    return user.data.data.user;
                }
                else {
                    user = await this.#axios.post("/", { "query": "mutation Create($uuid: String!) { create(uuid: $uuid, age: null, img: null, imgFormat: null) { uuid age img imgFormat } }", "variables": { "uuid": id }, "operationName": "Create" })
                    if (user?.status === 200) {
                        return  user.data.data.create;
                    }
                    else {
                        throw new Error(`Could not create User Profile in MongoDB`)
                    }
                }
            }
            else throw new Error(`Error could not get User data from ${id}`)
            
        } catch (error) {
            console.error(error);
        }
    }
}

const keycloak = {
    async install(app: App) {
        // Init keycloak
        const keycloakConfig: KeycloakConfig = {
            url: 'http://localhost:8080',
            realm: 'App',
            clientId: 'UI'
        }
        const keycloak = new Keycloak(keycloakConfig);
        try {
            let auth:boolean = false;
            while(!auth){
                auth = await keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
            }
            console.log("Authenticated")
            if (keycloak.token) localStorage.setItem('vue-token', keycloak.token)
            if (keycloak.refreshToken) localStorage.setItem("vue-refresh-token", keycloak.refreshToken)

            setInterval(async () => {
                const refreshed = await keycloak.updateToken(70)
                if (refreshed) console.log('Token refreshed')
                else console.log(`Token not refreshed, valid for ${Math.round((keycloak?.tokenParsed?.exp || 0) - (keycloak?.timeSkew || 0) - new Date().getTime() / 1000)}s`)
            }, 60000)
            app.config.globalProperties.$keycloak = keycloak
            app.config.globalProperties.$user = await (new Profile(app)).init()
        } catch (error) {
            console.error(error)
        }
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $keycloak: Keycloak;
        $user: ProfileDescriptor;
    }
}

export default keycloak