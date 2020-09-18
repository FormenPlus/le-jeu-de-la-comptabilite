<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="640px">
      <v-card>
        <v-card-title class="white--text" :style="{backgroundColor: $clrActifOn[numJoueur]}">
          <span class="title font-weight-regular">Ajouter une écriture</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <div class="col-2">
              <v-text-field
                v-model="texteCpt"
                type="text"
                :label="myLabelCpt"
              ></v-text-field>
            </div>
            <div class="col-6">
              <v-text-field
                v-model="libelle"
                type="text"
                label="Libelle *"
              ></v-text-field>
            </div>
            <div class="col-2">
              <v-text-field
                v-model="depense"
                type="number"
                :label="myLabelDepense"
              ></v-text-field>
            </div>
            <div class="col-2">
              <v-text-field
                v-model="recette"
                type="number"
                :label="myLabelRecette"
              ></v-text-field>
            </div>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-0" style="background-color: #eeeeee">
          <span class="caption red--text text--darken-2 font-weight-medium"
            >* Champ(s) requis</span
          >
          <span
            v-if="nbrEcritures < 6"
            class="caption red--text text--darken-2 font-weight-medium ml-5"
            >* Les 6 premières ecritures sont modifiables.</span
          >
          <v-spacer></v-spacer>
          <v-btn color="black--text" text @click="closeDialog">Annuler</v-btn>
          <v-btn color="warning" :disabled="!isValid" @click="valider"
            >Valider</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DialogGrandJournal",
  props: [
    "update",
    "propTexteCpt",
    "propLibelle",
    "propDepense",
    "propRecette",
    "propIndex",
  ],
  data() {
    return {
      texteCpt: null,
      libelle: null,
      depense: null,
      recette: null,
      labelCpt: this._texteCpt,
    };
  },
  computed: {
    ...mapState(["nbrEcritures", "$clrActifOn", "numJoueur"]),
    dialog() {
      if (this.$store.state.dialogJournal && this.update) {
        this.reloadEcriture();
      }
      return this.$store.state.dialogJournal;
    },
    isValid() {
      let valid = false;
      if (this.nbrEcritures < 6) {
        valid = this.libelle;
      } else {
        valid =
          (this.texteCpt && this.libelle && this.depense) ||
          (this.texteCpt && this.libelle && this.recette);
      }
      return valid;
    },
    myLabelCpt() {
      return this.nbrEcritures > 5 ? "Compte *" : "Compte";
    },
    myLabelDepense() {
      return this.nbrEcritures > 5 ? "Dépense *" : "Dépense";
    },
    myLabelRecette() {
      return this.nbrEcritures > 5 ? "Recette *" : "Recette";
    },
  },
  methods: {
    ...mapMutations(["mState"]),
    valider() {
      /*let valid = false;
      if (this.nbrEcritures < 6) {
        valid = this.libelle;
      } else {
        valid =
            (this.texteCpt && this.libelle && this.depense) ||
            (this.texteCpt && this.libelle && this.recette);
      }

      if (!valid) return false;*/

      // Attention : il faut convertire la somme en type number !!!!!
      let ecriture = {
        texteCpt: this.texteCpt,
        libelle: this.libelle,
        depense: +this.depense,
        recette: +this.recette,
        index: this.propIndex,
        annee: this.$store.state.annee,
        numJoueur: this.$store.state.numJoueur,
        numPlateau: this.$store.state.numPlateau,
        update: false
      };

      if (this.update) {
        ecriture.update = true;
        ecriture.fromServer = false;
        ecriture.type = "ecritures";
        ecriture.journal = "grandJournal";
        this.$store.dispatch("updateGrandJournal", ecriture);
      } else {
        this.$store.dispatch("ecrireAuGrandJournal", ecriture);
      }
      this.closeDialog();
    },
    closeDialog() {
      this.texteCpt = null;
      this.libelle = null;
      this.depense = null;
      this.recette = null;
      this.$store.commit("dialogJournal", false);
    },
    reloadEcriture() {
      this.texteCpt = this.propTexteCpt;
      this.libelle = this.propLibelle;
      this.depense = this.propDepense;
      this.recette = this.propRecette;
    },
  },
};
</script>
