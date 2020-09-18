<template>
  <div class="retour-accueil" style="position: absolute; left: 5%; bottom: 20px;">
    <v-btn text small
           large
           color="#7b458b"
           outlined
           @click="goTo"
    >
      <v-icon color="#7b458b" left>arrow_back</v-icon>
      Retour à l'accueil
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "RetourAccueil",
    methods: {
      goTo() {
        this.$router.push({name: "Accueil"});
      }
    }
  }
</script>
