<template>
  <div class="bottom-bar">
    <v-spacer></v-spacer>
    <BtnConnexion/>
  </div>
</template>

<script>
  import firebase from "firebase";
  import {mapMutations} from "vuex";
  import BtnConnexion from "./BtnConnexion";

  export default {
    name: "BottomBarAccueil",
    components: {
      BtnConnexion
    },
    methods: {
      ...mapMutations(["mLogout"]),
      deconnexion() {
        firebase.auth().signOut().then(() => {
          this.mLogout();
          this.$router.push({name: "Accueil"});
        });
      },
      clearLocalStorage() {
        localStorage.clear();
      }
    }
  }
</script>
