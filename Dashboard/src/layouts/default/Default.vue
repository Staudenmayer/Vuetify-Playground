<template>
  <v-app>
    <default-bar>
      <template v-slot:title>
        <v-breadcrumbs :items="crumbs">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </template>
    </default-bar>
    <v-main class="h-100">
      <router-view @updateCrumbs="updateCrumbs" />
    </v-main>
    <default-footer />
  </v-app>
</template>
  
<script lang="ts" setup>
import { defineComponent } from 'vue'
import DefaultBar from '@/layouts/utils/AppBar.vue'
import DefaultFooter from '@/layouts/utils/Footer.vue'
interface route {
  title: string,
  disabled: boolean,
  href?: string
}
</script>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      crumbs: [
        {
          title: this.$route.name,
          disabled: false,
          href: this.$route.path
        }] as Array<route>
    }
  },
  methods: {
    updateCrumbs: function (path: Array<route>) {
      this.crumbs = path;
    }
  },
  watch: {
    $route(_new, _old){
      if(_new.path !== _old.path) this.crumbs[0] = {
          title: _new.name,
          disabled: false,
          href: _new.path
        }
    }
  }
})
</script>
