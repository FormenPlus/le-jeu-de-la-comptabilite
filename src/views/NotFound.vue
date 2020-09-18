<template>
  <div class="container _100vh">
    <v-alert
        class="mt-10 mb-10"
        border="left"
        color="red lighten-2"
        dark
        type="error"
    >
      <h3>La page que vous tentez de consulter n'existe pas !</h3>
    </v-alert>
    <div class="text-center mt-10">
      <v-btn @click="$router.push({name: 'Accueil'})">Retour à l'accueil</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound"
  }
</script>

<style scoped>

</style>