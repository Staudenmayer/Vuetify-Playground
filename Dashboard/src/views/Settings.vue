<template>
  <div class="d-flex flex-column justify-center align-center pa-5">
    <v-card height="30%" width="30%" class="d-flex justify-center pa-5">
      <Profile size="150px" :hover="true"></Profile>
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
      <tr>
        <td></td>
        <td>
          <a href="https://dribbble.com/shots/20021494-Bonds-My-Account-Page" target=”_blank”>Template</a>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
  
<script lang="ts" setup>
import Profile from '@/components/Profile.vue'
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