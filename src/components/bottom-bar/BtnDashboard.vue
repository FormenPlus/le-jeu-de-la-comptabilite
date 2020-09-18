<template>
  <v-btn icon dark class="mr-5" @click="goToDashboard">
    <v-icon>dashboard</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: "BtnDashboard",
    methods: {
      goToDashboard() {
        if (this.$route.name !== "DashboardFormateur") {
          this.$router.push({name: 'DashboardFormateur'})
        }
      }
    }
  }
</script>