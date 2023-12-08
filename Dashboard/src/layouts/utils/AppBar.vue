<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <slot name="title">{{ $route.name }}</slot>
    </v-app-bar-title>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="pa-0 ma-0">
            <Profile size="30"></Profile>
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card v-if="isActive" class="bg-secondary elevation-15">
            <v-list density="compact" nav class="bg-secondary elevation-15">
              <v-list-item class="d-flex justify-center">
                <Profile size="150px"></Profile>
              </v-list-item>
              <v-list-item class="d-flex justify-center">
                {{ $user?.username }}
              </v-list-item>
              <v-divider></v-divider>
              <a class="drawer-link" :href="$keycloak?.createAccountUrl()">
                <v-list-item prepend-icon="mdi-account" title="My Account"></v-list-item>
              </a>
              <router-link class="drawer-link" to="/settings">
                <v-list-item prepend-icon="mdi-cog" title="Settings"></v-list-item>
              </router-link>
              <a class="drawer-link" :href="$keycloak?.createLogoutUrl()">
                <v-list-item prepend-icon="mdi-logout" title="Logout"></v-list-item>
              </a>
            </v-list>
          </v-card>
        </template>
      </v-menu>
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

<script lang="ts" setup>
import { defineComponent } from 'vue'
import Profile from '@/components/Profile.vue'
</script>

<script lang="ts">

export default defineComponent({
  props: {
    theme: String
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    profile: function (): String {
      let res = "";
      if (this.$user?.img && this.$user?.imgFormat) {
        res = `data:image/${this.$user.imgFormat};base64, ${this.$user.img}`
      }
      return res;
    }
  },
  methods: {
    toggleTheme() {
      this.$emit("v-change-theme", this.theme === 'dark' ? 'light' : 'dark');
    }
  }
})
</script>