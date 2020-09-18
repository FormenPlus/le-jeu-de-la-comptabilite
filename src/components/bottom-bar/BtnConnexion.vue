<template>
  <v-btn class="pl-2 pr-2 indigo--text text--lighten-4" color="#1A2A5B" rounded small :loading="hasBtnLoaderIcon"
         @click="connexionDeconnexion">
    {{ nomDuBtn }}
    <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon dark>cached</v-icon>
                </span>
    </template>
  </v-btn>
</template>

<script>
  import firebase from "firebase";

  export default {
    name: "BtnConnexion",
    data() {
      return {
        hasBtnLoaderIcon: false
      }
    },
    computed: {
      nomDuBtn() {
        let nomBtn = ""
        if (this.$route.path === "/") {
          nomBtn = "connexion";
        } else if (this.$store.state.isLogin) {
          nomBtn = "deconnexion";
        } else if (this.$route.name === "Connexion"
            || this.$route.name === "InscriptionParticipant"
            || this.$store.state.role === "visiteur") {
          nomBtn = "Accueil"
        }
        return nomBtn;
      }
    },
    methods: {
      async connexionDeconnexion() {
        if (this.$store.state.isLogin) {
          this.hasBtnLoaderIcon = true;
          const signOut = await this.$store.dispatch("signOut");
          if (signOut) {
            this.hasBtnLoaderIcon = false;
            this.$router.push({name: "Accueil"});
          }
        }
        //
        else {
          if (this.$route.path === "/") {
            this.$router.push({name: "Connexion"});
          }
          //
          else if (
              (this.$route.path !== "/" && this.$store.state.role === null)
              || this.$route.name === "Connexion"
              || this.$route.name === "InscriptionParticipant"
              || this.$store.state.role === "visiteur"
          ) {
            this.$store.commit("mRaz");
            this.$router.push({name: "Accueil"});
          }
        }
      }
    }
  }
</script>