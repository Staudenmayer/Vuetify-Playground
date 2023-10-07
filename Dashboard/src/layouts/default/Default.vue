<template>
  <v-app>
    <default-bar />
    <default-view class="h-100"/>
    <default-footer/>
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultFooter from './Footer.vue'
</script>
