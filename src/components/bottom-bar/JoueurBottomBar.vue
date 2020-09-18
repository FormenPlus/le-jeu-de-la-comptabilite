<template>
  <div class="joueur-bottom-bar d-flex align-center">
    <v-btn @click="changeJoueurAffiche" dark fab depressed :color="$clrActifOn[num]" style="width: 32px; height: 32px">
      <v-icon style="width: 24px; height: 24px">{{ numJoueur === num ? "directions_run" : "person"}}</v-icon>
    </v-btn>
    <div class="ml-1 mr-1 white--text caption d-inline-block usn" style="font-family: Roboto, sans-serif; font-weight: 500; line-height: 1rem">{{ prenom }}
      </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "JoueurBottomBar",
    props: ["prenom", "num"],
    data() {
      return {}
    },
    methods: {
      ...mapMutations(["mJoueurAffiche"]),
      changeJoueurAffiche() {
        this.mJoueurAffiche(this.num);
        if (this.$route.name === "Plateau" || this.$route.name === "DashboardFormateur" || this.$route.name === "Quiz") {
          this.$router.push({name: "Journaux"});
        }
      }
    },
    computed: {
      ...mapState(["$clrActifOn", "numJoueur", "numJoueurAffiche"]),
    }
  }
</script>