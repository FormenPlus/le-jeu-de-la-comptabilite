<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="white--text" style="background-color: #E53935">
          <span class="title font-weight-regular"
            >Changement d'année comptable</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <p class="body-1 grey--text text--darken-4 mt-2">
              En confirmant le changement d'année comptable, vous pourrez
              toujours consulter la 1ere année mais vous ne pourrez plus y
              enregistrer d'écritures.
            </p>
            <p class="red--text text--darken-2 font-weight-medium">
              <v-icon color="red darken-1">warning</v-icon> Cette opération est
              irréversible.
            </p>
          </v-container>
        </v-card-text>
        <v-card-actions class="mt-0" style="background-color: #FFCDD2">
          <v-spacer></v-spacer>
          <v-btn color="black--text" text @click="annulerChangementAnnee"
            >Annuler</v-btn
          >
          <v-btn color="#E53935" dark @click="valider"
            >Valider le changement d'année</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "DialogChangementAnnee",
  computed: {
    dialog() {
      return this.$store.state.dialogAnnee;
    },
  },
  methods: {
    ...mapMutations(["mState"]),
    annulerChangementAnnee() {
      this.mState({ prop: "dialogAnnee", vl: false });
      this.mState({ prop: "annulerChangementAnnee", vl: true });
    },
    valider() {
      this.$store.dispatch("changerAnnee");
      this.mState({ prop: "dialogAnnee", vl: false });
    },
  },
};
</script>
