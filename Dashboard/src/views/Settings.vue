<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card height="30%" width="30%" class="pa-5 d-flex justify-center">
    <a href="https://dribbble.com/shots/20021494-Bonds-My-Account-Page" target=”_blank”>Template</a>
  </v-card>
  </div>
    <v-table class="d-none">
    <tbody>
      <tr>
        <td>Username:</td>
        <td>{{ this.$user.username }}</td>
      </tr>
      <tr>
        <td>First Name:</td>
        <td>{{ this.$user.firstName }}</td>
      </tr>
      <tr>
        <td>Last Name:</td>
        <td>{{ this.$user.lastName }}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>
            {{ this.$user.email }}
        </td>
      </tr>
    </tbody>
  </v-table>
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
    },
    methods: {
    }
}
</script>