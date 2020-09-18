<template>
  <span>
  </span>
</template>

<script>
  import db from "./init";

  export default {
    name: "FirebaseActionsJoueurs",
    created() {

      // -------------------------------------------------------
      // Référence la collection Firebase qu'on écoute.
      db.collection(this.$store.state.usersActions)
          .where("codeFormation", "==", this.$store.state.codeFormation)
          .where("numPlateau", "==", this.$store.state.numPlateau)
          .orderBy("timestamp")
          .onSnapshot(snapshot => {

            // Indique d'ouvient les données.
            // Si le snapshot n'a pas d'écritures en attente (hasPendingWrites).
            const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
            if (source === "Local") {
              return false;
            }

            snapshot.docChanges().forEach(change => {

              if (change.type === "added") {

                let actionJoueur = change.doc.data();

                if (actionJoueur.type === "joueurs") {
                  this.$store.commit("mJoueur", actionJoueur);
                }
                //
                else if (actionJoueur.type === "ecritures" && actionJoueur.cpt === "grandJournal") {
                  if (actionJoueur.update) {
                    actionJoueur.fromServer = true;
                    this.$store.dispatch("updateGrandJournal", actionJoueur);
                  } else {
                    this.$store.commit("ecrireAuGrandJournal", actionJoueur);
                  }
                }
                //
                else if (actionJoueur.type === "ecritures") {
                  this.$store.commit("ecrireAuBilanOuCr", actionJoueur);
                }
              }
            })
          });
    }
  }
</script>
