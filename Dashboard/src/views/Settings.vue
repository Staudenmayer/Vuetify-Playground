<template>
    <v-btn @click="test()">test</v-btn>
    {{ this.$user }}
</template>
  
<script lang="ts" setup>
</script>
<script lang="ts">
export default {
    data() {
        return {
        }
    },
    beforeCreate() {
    },
    beforeUnmount() {
    },
    mounted() {
        console.log(this.$keycloak)
    },
    methods: {
        test(){
            this.$keycloak.login()
        }
    }
}
</script>