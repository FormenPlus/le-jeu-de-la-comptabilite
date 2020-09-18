<template>
  <div
      :key="$store.state.keyGrdJournal"
      class="grand-journal journal d-flex flex-column justify-space-between"
      :class="{
      'update-grd-journal': nbrEcritures < 7,
    }"
  >
    <h3 class="text-center mb-1 usn" :style="{ color: $clrTexte[numJoueurAffiche] }">
      Grand journal
      <span class="caption font-weight-medium"
      ><i>année {{ anneeAffichee + 1 }}</i></span
      >
    </h3>
    <div class="v-data-table v-data-table--dense theme--light elevation-3">
      <table id="grand-journal" class="elevation-3" style="border-collapse:collapse; width: 100%">
        <tr>
          <td
              colspan="3"
              class="subtitle-1 bl-none br-thin"
              style="border-left: none !important;"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
          >
            51 Banque
          </td>
          <td class="bt-thin br-thin gj-w-somme text-right">Report</td>
          <td class="select bt-thin br-thin gj-w-somme gj-somme">
            {{ _report }}
          </td>
        </tr>
        <tr>
          <td class="bt-thin gj-w-cpt"><b>Cpt.</b></td>
          <td class="bt-thin gj-w-libelle"><b>Libellé</b></td>
          <td class="bt-thin gj-w-somme"><b>Dépenses</b></td>
          <td class="bt-thin gj-w-somme"><b>Recettes</b></td>
          <td class="bt-thin gj-w-somme"><b>Solde</b></td>
        </tr>
        <tbody @click="updateEcriture">
        <tr v-for="(ligne, index) in _ecrituresDuGrdJournal" :key="index">
          <td :data-index="index" class="gj-cpt">{{ ligne.texteCpt }}</td>
          <td :data-index="index" class="gj-libelle" :title="ligne.libelle">
            {{ ligne.libelle }}
          </td>
          <td :data-index="index" class="gj-somme select">
            {{ ligne.depense === 0 ? "" : ligne.depense }}
          </td>
          <td :data-index="index" class="gj-somme select">
            {{ ligne.recette === 0 ? "" : ligne.recette }}
          </td>
          <td :data-index="index" class="gj-somme select">
            {{ ligne.solde }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <v-btn
        dark
        v-show="_canIplay"
        :color="$clrTexte[numJoueurAffiche]"
        class="mt-10"
        @click="openDialog"
    >Ajouter une écriture
    </v-btn
    >
    <DialogGrandJournal
        :update="update"
        :prop-texte-cpt="texteCpt"
        :prop-libelle="libelle"
        :prop-depense="depense"
        :prop-recette="recette"
        :prop-index="index"
    />
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import DialogGrandJournal from "./DialogGrandJournal";

  export default {
    name: "GrandJournal",
    components: {DialogGrandJournal},
    data() {
      return {
        update: false,
        texteCpt: "",
        libelle: "",
        depense: 0,
        recette: 0,
        index: 0,
      };
    },
    computed: {
      ...mapGetters([
        "_ecrituresDuGrdJournal",
        "_canIplay",
        "_report"
      ]),
      ...mapState(["$clrTexte", "annee", "anneeAffichee", "numJoueurAffiche", "nbrEcritures"]),
    },
    methods: {
      updateEcriture(evt) {
        if (!this._canIplay || this.nbrEcritures > 6) return false;

        if (evt.target.getAttribute("data-index") < 6) {
          let ecriture = JSON.parse(
              JSON.stringify(
                  this.$store.getters._ecritureUpdateDuGrdJournal(evt.target.getAttribute("data-index"))
              )
          );
          this.update = true;
          this.texteCpt = ecriture.texteCpt;
          this.libelle = ecriture.libelle;
          this.depense = ecriture.depense;
          this.recette = ecriture.recette;
          this.index = ecriture.index;

          this.$store.commit("dialogJournal", true);
        }
      },
      openDialog() {
        if (!this._canIplay) return;

        this.update = false;
        this.$store.commit("dialogJournal", true);
      },
    },
  };
</script>

<style scoped>
  .bt-1 {
    border-top: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bb-1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bl-1 {
    border-left: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bt-thin {
    border-top: 1px solid #0000004d !important;
  }

  .bb-thin {
    border-bottom: 1px solid #0000004d !important;
  }

  .bl-thin {
    border-left: 1px solid #0000004d !important;
  }

  .br-thin {
    border-right: 1px solid #0000004d !important;
  }

  .bt-none {
    border-top: none !important;
  }

  .bl-none {
    border-left: none !important;
  }
</style>