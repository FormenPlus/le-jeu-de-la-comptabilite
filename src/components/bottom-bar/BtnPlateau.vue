<template>
  <v-btn class="ml-4" dark icon @click="goToPlateau" :disabled="$route.name === 'Plateau'">
    <v-icon>select_all</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: "BtnPlateau",
    methods: {
      goToPlateau() {
        this.$store.commit("mState", {prop: "numJoueurAffiche", vl: this.$store.state.numJoueur})
        this.$router.push("Plateau");
      }
    }
  }
</script>