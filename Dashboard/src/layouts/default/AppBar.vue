<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ $route.name }}</v-app-bar-title>

    <template v-slot:append>
      <v-menu width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-account"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="Account" class="bg-secondary">
              <v-list density="compact" nav class="bg-secondary">
                <v-list-item class="d-flex justify-center">
                  <v-avatar size="150px">
                    <v-img src="">
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-icon icon="mdi-account-circle" size="150px"></v-icon>
                        </div>
                      </template>
                    </v-img>
                  </v-avatar>
                </v-list-item>
                <v-list-item class="d-flex justify-center">
                  {{ $user.username }}
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item prepend-icon="mdi-account"               title="My Account"  @click="$keycloak.accountManagement()"></v-list-item>
                <router-link class="drawer-link" to="/settings">
                  <v-list-item prepend-icon="mdi-cog"                   title="Settings"    @click=""></v-list-item>
                </router-link>
                <v-list-item prepend-icon="mdi-weather-sunny"         title="Light Mode"  @click="toggleTheme()" v-if="this.theme.global.current.dark"></v-list-item>
                <v-list-item prepend-icon="mdi-moon-waning-crescent"  title="Dark Mode"   @click="toggleTheme()" v-else></v-list-item>
                <v-list-item prepend-icon="mdi-logout"                title="Logout"      @click="$keycloak.logout()"></v-list-item>
              </v-list>
          </v-card>
        </template>
      </v-menu>
      <!--<v-btn icon="mdi-logout" @click="$keycloak.logout()"></v-btn>-->
    </template>
  </v-app-bar>
  <v-navigation-drawer theme="dark" v-model="drawer" temporary>
    <v-list color="transparent">
      <router-link class="drawer-link" to="/"><v-list-item prepend-icon="mdi-home"
          title="Home"></v-list-item></router-link>
      <router-link class="drawer-link" to="/workout"><v-list-item prepend-icon="mdi-dumbbell"
          title="Workout"></v-list-item></router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { getDefaultHighWaterMark } from 'stream';
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'

export default defineComponent({
  // type inference enabled
  data() {
    return {
      drawer: false,
      theme: useTheme()
    }
  },
  methods: {
    toggleTheme () {
      this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark';
    }
  }
})
</script>

<style scoped>
.drawer-link {
  text-decoration: none;
  color: inherit;
}

.drawer-link:hover {
  text-decoration: none;
  color: rgb(var(--v-theme-primary));
}
</style>
