<template>
  <v-btn
      text
      small
      @click="goToAccueil"
      class="mr-5">
    Retour à l'accueil
  </v-btn>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: "BtnRetourAccueil",
    methods: {
       goToAccueil() {
         const currentUser = firebase.auth().currentUser;
         if (currentUser !== null) {
           firebase.auth()
               .signOut()
               .then(() => {
                 this.$store.commit("mLogout");
               });
         }
         this.$store.commit("mRaz");
         this.$router.push({name: "Accueil"});
         localStorage.clear();
      }
    }
  }
</script>