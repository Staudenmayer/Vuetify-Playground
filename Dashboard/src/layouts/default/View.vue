<template>
    <default-bar/>
    <v-main class="h-100">
      <router-view/>
    </v-main>
    <default-footer/>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import DefaultBar from './AppBar.vue'
import DefaultFooter from './Footer.vue'
</script>