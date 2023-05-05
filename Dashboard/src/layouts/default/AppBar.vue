<template>
  <v-app-bar density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ $route.name }}</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer
        theme="dark"
        v-model="drawer"
        temporary
      >
        <v-list color="transparent">
          <router-link class="drawer-link" to="/"><v-list-item prepend-icon="mdi-home" title="Home"></v-list-item></router-link>
          <router-link class="drawer-link" to="/dashboard"><v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item></router-link>
          <router-link class="drawer-link" to="/workout"><v-list-item prepend-icon="mdi-dumbbell" title="Workout"></v-list-item></router-link>
        </v-list>
      </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  data() {
    return {
      drawer: false
    }
  },
  methods: {

  }
})
</script>

<style scoped>
  .drawer-link{
    text-decoration: none;
    color: inherit;
  }
  .drawer-link:hover{
    text-decoration: none;
    color: rgb(var(--v-theme-primary));
  }
</style>
