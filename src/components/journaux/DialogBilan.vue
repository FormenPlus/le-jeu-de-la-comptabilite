<template>
  <v-layout row justify-center class="dialog-bilan">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="white--text" :style="{backgroundColor: $clrActifOn[numJoueur]}">
          <span class="title font-weight-regular" style="word-break: normal">{{ titreDlg }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                v-if="typeCpt === 'text'"
                v-model="texte"
                label="Votre texte *"
                autofocus
            ></v-text-field>

            <v-row v-if="typeCpt === 'somme'">
              <div class="col-8"></div>
              <div class="col-4">
                <v-text-field
                    v-model="somme"
                    type="number"
                    label="La somme *"
                    autofocus
                ></v-text-field>
              </div>
            </v-row>

            <v-row v-if="typeCpt === 'histo'">
              <div class="col-6">
                <p class="headline">
                  {{ typeCpt === "histo" ? "Historique" : "" }}
                </p>
                <ul>
                  <li
                      v-for="(ecriture, index) in _historiqueDuCpt(cpt)"
                      :key="index"
                  >
                    {{ ecriture }}
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <v-text-field
                    v-model="somme"
                    type="number"
                    label="La somme *"
                    autofocus
                ></v-text-field>
              </div>
            </v-row>

            <v-row v-if="typeCpt === 'text-somme'">
              <div class="col-8 body-1 orange--text font-weight-medium">
                {{ _cpt(cptText) }}<br><span class="caption grey--text text--darken-4 font-italic">(Dernière texte saisi)</span>
              </div>
              <div class="col-4 body-1 orange--text font-weight-medium">
                {{ _cpt(cpt) }} <br><span
                  class="caption grey--text text--darken-4 font-italic">(Dernière somme saisie)</span></div>
            </v-row>

            <v-row v-if="typeCpt === 'text-somme'">
              <div class="col-8">
                <v-text-field
                    v-model="texte"
                    label="Votre texte *"
                    autofocus
                ></v-text-field>
              </div>
              <div class="col-4">
                <v-text-field
                    v-model="somme"
                    type="number"
                    label="La somme *"
                ></v-text-field>
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mt-0" style="background-color: #eeeeee">
          <span class="caption red--text text--darken-2 font-weight-medium"
          >* Champ(s) requis</span
          >
          <v-spacer></v-spacer>
          <v-btn color="black--text" text @click="closeDialog">Annuler</v-btn>
          <v-btn color="warning" :disabled="!isValid" @click="valider"
          >Valider
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

  import {mapState, mapGetters} from "vuex";

  export default {
    name: "DialogBilan",
    props: ["titreDlg", "cpt", "cptText", "typeCpt"],
    data() {
      return {
        texte: "",
        somme: ""
      };
    },
    computed: {
      ...mapGetters(["_historiqueDuCpt", "_cpt"]),
      ...mapState(["$clrActifOn", "numJoueur"]),
      dialog() {
        return this.$store.state.dialogBilan;
      },
      isValid() {
        let valid = false;

        switch (this.typeCpt) {
          case "text":
            if (this.texte !== "") valid = true;
            break;
          case "somme":
          case "histo":
            if (this.somme !== "") valid = true;
            break;
          case "text-somme":
            if (this.texte !== "" && this.somme !== "") valid = true;
            break;
        }
        return valid;
      },
    },
    methods: {
      valider() {
        /*let valid = false;

        switch (this.typeCpt) {
          case "text":
            if (this.texte !== "") valid = true;
            break;
          case "somme":
          case "histo":
            if (this.somme !== "") valid = true;
            break;
          case "text-somme":
            if (this.texte !== "" && this.somme !== "") valid = true;
            break;
        }

        if (!valid) return false;*/

        // Attention : il faut convertire la somme en type number !!!!!
        const payload = {
          numPlateau: this.$store.state.numPlateau,
          type: "ecritures",
          numJoueur: this.$store.state.numJoueur,
          annee: this.$store.state.annee,
          typeCpt: this.typeCpt,
          cpt: this.cpt,
          cptText: this.cptText,
          texte: this.texte,
          somme: +this.somme,
          codeFormation: this.$store.state.codeFormation
        };

        this.$store.dispatch("ecrireAuBilanOuCr", payload);
        this.$store.commit("dialogBilan", false);
        this.resetInput();
      },
      closeDialog() {
        this.resetInput();
        this.$store.commit("dialogBilan", false);
      },
      resetInput() {
        this.texte = "";
        this.somme = "";
      },
    }
  };
</script>
