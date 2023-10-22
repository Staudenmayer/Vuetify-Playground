<template>
  <v-theme-provider :theme="theme">
    <default-bar :theme="theme" @v-change-theme="changeTheme"/>
    <v-main class="">
      <router-view />
    </v-main>
    <default-footer />
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import DefaultBar from './AppBar.vue'
import DefaultFooter from './Footer.vue'
</script>

<script lang="ts">
export default defineComponent({
  data(){
    return {
      theme: 'dark' as string
    }
  },
  methods:{
    changeTheme(val: string){
      this.theme = val;
    }
  }
})
</script>