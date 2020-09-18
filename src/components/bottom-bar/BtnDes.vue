<template>
  <v-btn class="pl-2 pr-2" :disabled="$store.state.numJoueurAffiche !== $store.state.numJoueur || $route.name === 'Journaux'" text @click="jouer">
    <les-des></les-des>
  </v-btn>
</template>

<script>
  import LesDes from "./LesDes";

  export default {
    name: "BtnDes",
    components: {
      LesDes,
    },
    methods: {
      jouer() {
        if (this.$store.state.numJoueurAffiche === this.$store.state.numJoueur) {
          this.$store.dispatch("avancerLePionDuJoueur");
        }
      }
    }
  }
</script>