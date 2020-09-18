<template>
  <div class="journal cr flex-grow-1">
    <h3 class="text-center mb-1" :style="{ color: $clrTexte[numJoueurAffiche] }">
      Compte de Résultat
      <span class="caption font-weight-medium"
      ><i>année {{ anneeAffichee + 1 }}</i></span
      >
    </h3>
    <div class="v-data-table v-data-table--dense theme--light elevation-3">
      <table id="compte-de-resultat" class="elevation-3" style="border-collapse:collapse; width: 100%">
        <tbody @click="editer">
        <tr class="bb-thin">
          <td colspan="2" class="text-center">
            <div
                class="font-weight-bold bb-thin"
                :style="{ color: $clrTexte[numJoueurAffiche] }"
                data-type-cpt="text"
                data-cpt="crTxtChg1"
                :data-titre-dlg="_titreDlg('crTxtChg1')"
            >
              {{ _texte("crTxtChg1") }}
            </div>
            <div
                class="subtitle-1"
                :style="{ color: $clrTexte[numJoueurAffiche] }"
                data-type-cpt="text"
                data-cpt="crTxtChg2"
                :data-titre-dlg="_titreDlg('crTxtChg2')"
            >
              {{ _texte("crTxtChg2") }}
            </div>
          </td>
          <td colspan="2" class="text-center">
            <div
                class="font-weight-bold bb-thin"
                :style="{ color: $clrTexte[numJoueurAffiche] }"
                data-type-cpt="text"
                data-cpt="crTxtPrd1"
                :data-titre-dlg="_titreDlg('crTxtPrd1')"
            >
              {{ _texte("crTxtPrd1") }}
            </div>
            <div
                class="subtitle-1"
                :style="{ color: $clrTexte[numJoueurAffiche] }"
                data-type-cpt="text"
                data-cpt="crTxtPrd2"
                :data-titre-dlg="_titreDlg('crTxtPrd2')"
            >
              {{ _texte("crTxtPrd2") }}
            </div>
          </td>
        </tr>
        <tr class="bb-thin">
          <td>60 ACHATS</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr60"
              :data-titre-dlg="_titreDlg('cr60')"
          >
            {{ _cptCumul("cr60") }}
          </td>
          <td>
                  <span class="float-left">70 VENTES (HT)</span
                  ><span class="float-right">CA</span>
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="cr70"
              :data-titre-dlg="_titreDlg('cr70')"
          >
            {{ _cptCumul("cr70") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="crTxtChg3"
              :data-titre-dlg="_titreDlg('crTxtChg3')"
          >
            {{ _texte("crTxtChg3") }}
          </td>
          <td
              data-type-cpt="text-somme"
              data-cpt-text="cr603TextAdd"
              data-cpt="cr603"
              :data-titre-dlg="_titreDlg('cr603')"
          >
            {{ _cpt("cr603") }}
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td>61 Services Externes</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr61"
              :data-titre-dlg="_titreDlg('cr61')"
          >
            {{ _cptCumul("cr61") }}
          </td>
          <td>71 Production Stockée</td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="cr71Txt"
              :data-titre-dlg="_titreDlg('cr71Txt')"
          >
            {{ _texte("cr71Txt") }}
          </td>
          <td
              data-type-cpt="text-somme"
              data-cpt-text="cr71TextAdd"
              data-cpt="cr71"
              :data-titre-dlg="_titreDlg('cr71')"
          >
            {{ _cpt("cr71") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>62 Autres Services</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr62"
              :data-titre-dlg="_titreDlg('cr62')"
          >
            {{ _cptCumul("cr62") }}
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td style="color: #fff">fooo</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td>63 Impôts et Taxes</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr63"
              :data-titre-dlg="_titreDlg('cr63')"
          >
            {{ _cptCumul("cr63") }}
          </td>
          <td>72 Production Immob.</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr72"
              :data-titre-dlg="_titreDlg('cr72')"
          >
            {{ _cpt("cr72") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td style="color: #fff">fooo</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>64 Charges Personnel</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr64"
              :data-titre-dlg="_titreDlg('cr64')"
          >
            {{ _cptCumul("cr64") }}
          </td>
          <td>74 Subvention Exploit.</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr74"
              :data-titre-dlg="_titreDlg('cr74')"
          >
            {{ _cpt("cr74") }}
          </td>
        </tr>
        <tr>
          <td class="bt-1 bb-1">Sous-Total</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="crSttChg"
              :data-titre-dlg="_titreDlg('crSttChg')"
          >
            {{ _cpt("crSttChg") }}
          </td>
          <td class="bt-1 bb-1">Sous-Total</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="crSttPrd"
              :data-titre-dlg="_titreDlg('crSttPrd')"
          >
            {{ _cpt("crSttPrd") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="crTxtPrd4"
              :data-titre-dlg="_titreDlg('crTxtPrd4')"
          >
            {{ _texte("crTxtPrd4") }}
          </td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td>65 Autres Charges</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr65"
              :data-titre-dlg="_titreDlg('cr65')"
          >
            {{ _cptCumul("cr65") }}
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td>68 Dot. Amortissement</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr68"
              :data-titre-dlg="_titreDlg('cr68')"
          >
            {{ _cpt("cr68") }}
          </td>
          <td>78 Reprises</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr78"
              :data-titre-dlg="_titreDlg('cr78')"
          >
            {{ _cpt("cr78") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="crTxtPrd5"
              :data-titre-dlg="_titreDlg('crTxtPrd5')"
          >
            {{ _texte("crTxtPrd5") }}
          </td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td>66 Charges Financières</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr66"
              :data-titre-dlg="_titreDlg('cr66')"
          >
            {{ _cpt("cr66") }}
          </td>
          <td>76 Produits Financiers</td>
          <td
              data-type-cpt="somme"
              data-cpt="cr76"
              :data-titre-dlg="_titreDlg('cr76')"
          >
            {{ _cpt("cr76") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td style="color: #fff">fooo</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>67 Charges Except.</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr67"
              :data-titre-dlg="_titreDlg('cr67')"
          >
            {{ _cptCumul("cr67") }}
          </td>
          <td>77 Produits Except.</td>
          <td
              data-type-cpt="histo"
              data-cpt="cr77"
              :data-titre-dlg="_titreDlg('cr77')"
          >
            {{ _cptCumul("cr77") }}
          </td>
        </tr>
        <tr>
          <td class="bt-1 bb-1">Total des Charges</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="crTtChg"
              :data-titre-dlg="_titreDlg('crTtChg')"
          >
            {{ _cpt("crTtChg") }}
          </td>
          <td class="bt-1 bb-1">Total des Produits</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="crTtProd"
              :data-titre-dlg="_titreDlg('crTtProd')"
          >
            {{ _cpt("crTtProd") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td class="pl-5">BENEFICE BRUT</td>
          <td
              data-type-cpt="somme"
              data-cpt="crBb"
              :data-titre-dlg="_titreDlg('crBb')"
          >
            {{ _cpt("crBb") }}
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>69 Impôts sur Bénéfices (IS)</td>
          <td
              data-type-cpt="text-somme"
              data-cpt-text="cr69TextAdd"
              data-cpt="cr69"
              :data-titre-dlg="_titreDlg('cr69')"
          >
            {{ _cpt("cr69") }}
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="bt-1 bb-1">12 BENEFICE NET ( RN )</td>
          <td
              class="bt-1 bb-1 som"
              data-type-cpt="somme"
              data-cpt="cr12BN"
              :data-titre-dlg="_titreDlg('cr12BN')"
          >
            {{ _cpt("cr12BN") }}
          </td>
          <td class="bt-1 bb-1">12 PERTE NET ( RN )</td>
          <td
              class="bt-1 bb-1 som"
              data-type-cpt="somme"
              data-cpt="cr12p"
              :data-titre-dlg="_titreDlg('cr12p')"
          >
            {{ _cpt("cr12p") }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <DialogCr
        :titre-dlg="titreDlg"
        :cpt="cpt"
        :cpt-text="cptText"
        :type-cpt="typeCpt"
    />
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import DialogCr from "./DialogCr";

  export default {
    name: "CompteDeResultat",
    components: {DialogCr},
    data() {
      return {
        cpt: "",
        cptText: "",
        titreDlg: "",
        typeCpt: ""
      };
    },
    computed: {
      ...mapGetters([
        "_titreDlg",
        "_cptCumul",
        "_cpt",
        "_texte",
        "_canIplay"
      ]),
      ...mapState(["$clrTexte", "annee", "anneeAffichee", "numJoueurAffiche"]),
    },
    methods: {
      editer(evt) {

        if (!this._canIplay) return;

        this.$store.commit("mState", {prop: "journal", vl: "cr"})

        if (evt.target.getAttribute("data-cpt")) {
          this.cpt = evt.target.getAttribute("data-cpt");
          this.cptText = evt.target.getAttribute("data-cpt-text");
          this.titreDlg = evt.target.getAttribute("data-titre-dlg");
          this.typeCpt = evt.target.getAttribute("data-type-cpt");
          this.$store.commit("dialogCr", true);
        }
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
    border-bottom: thin solid #0000001f !important;
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