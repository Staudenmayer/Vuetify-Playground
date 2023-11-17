<template>
  <v-app>
    <default-bar></default-bar>
    <v-main class="h-100">
      <router-view />
    </v-main>
    <default-footer />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from '@/layouts/utils/AppBar.vue'
import DefaultFooter from '@/layouts/utils/Footer.vue'
</script>