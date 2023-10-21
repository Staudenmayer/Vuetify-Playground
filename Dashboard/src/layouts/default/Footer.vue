<template>
    <v-footer class="bg-bg-1 text-center d-flex flex-column">
        <div class="pt-0">
            Made by Sebastian Staudenmayer
        </div>

        <v-divider></v-divider>

        <div>
            {{ new Date().getFullYear() }} — <strong>Test</strong>
        </div>
    </v-footer>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // type inference enabled
    data() {
        return {
        }
    },
    methods: {
    }
})
</script>
  
<style scoped></style>
  