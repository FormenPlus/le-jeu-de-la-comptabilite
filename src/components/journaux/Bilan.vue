<template>
  <div class="journal bilan flex-grow-1">
    <h3 class="text-center mb-1 usn" :style="{ color: $clrTexte[numJoueurAffiche] }">
      Bilan
      <span class="caption font-weight-medium"
      ><i>année {{ anneeAffichee + 1 }}</i></span
      >
    </h3>
    <div class="v-data-table v-data-table--dense theme--light elevation-3">
      <table id="bilan" class="elevation-3" style="border-collapse:collapse; width: 100%">
        <tbody @click="editer">
        <tr class="bb-thin">
          <td
              class="text-center font-weight-bold"
              colspan="4"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtAct1"
              :data-titre-dlg="_titreDlg('blTxtAct1')"
          >
            {{ _texte("blTxtAct1") }}
          </td>
          <td
              class="text-center bl-1 font-weight-bold"
              colspan="2"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtPsf1"
              :data-titre-dlg="_titreDlg('blTxtPsf1')"
          >
            {{ _texte("blTxtPsf1") }}
          </td>
        </tr>
        <tr>
          <td v-if="anneeAffichee === 2" class="text-center"><b>ACTIF</b></td>
          <td
              v-else
              class="text-center subtitle-1"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtAct2"
              :data-titre-dlg="_titreDlg('blTxtAct2')"
          >
            {{ _texte("blTxtAct2") }}
          </td>
          <td class="text-center"><b>Brut</b></td>
          <td class="text-center"><b>Amortis.</b></td>
          <td class="text-center"><b>Net</b></td>
          <td
              class="bl-1 subtitle-1 text-center"
              colspan="2"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtPsf2"
              :data-titre-dlg="_titreDlg('blTxtPsf2')"
          >
            {{ _texte("blTxtPsf2") }}
          </td>
        </tr>
        <tr>
          <td class="bt-1 bb-thin underline">IMMOBILISATIONS</td>
          <td class="bt-1 bb-thin"></td>
          <td class="bt-1 bb-thin"></td>
          <td class="bt-1 bb-thin"></td>
          <td class="bt-1 bb-thin bl-1 underline">CAPITAUX PROPRES</td>
          <td class="bt-1 bb-thin"></td>
        </tr>
        <tr>
          <td class="bb-thin"><b>20 Incorporelles</b></td>
          <td class="bb-thin"></td>
          <td class="bb-thin"></td>
          <td class="bb-thin"></td>
          <td class="bl-1 bb-thin">10 Capital</td>
          <td
              class="bb-thin"
              data-type-cpt="histo"
              data-cpt="bl10"
              :data-titre-dlg="_titreDlg('bl10')"
          >
            {{ _cptCumul("bl10") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>205 Brevets, Log., Sites</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl205brut"
              :data-titre-dlg="_titreDlg('bl205brut')"
          >
            {{ _cptCumul("bl205brut") }}
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="bl205amt"
              :data-titre-dlg="_titreDlg('bl205amt')"
          >
            {{ _cptCumul("bl205amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl205net"
              :data-titre-dlg="_titreDlg('bl205net')"
          >
            {{ _cpt("bl205net") }}
          </td>
          <td
              class="bl-1"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtReserve"
              :data-titre-dlg="_titreDlg('blTxtReserve')"
          >
            {{ _texte("blTxtReserve") }}
          </td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td><b>21 Corporelles</b></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bl-1">11 Report à nouveau</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl11"
              :data-titre-dlg="_titreDlg('bl11')"
          >
            {{ _cptCumul("bl11") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>211 Terrains</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl211brut"
              :data-titre-dlg="_titreDlg('bl211brut')"
          >
            {{ _cptCumul("bl211brut") }}
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="bl211amt"
              :data-titre-dlg="_titreDlg('bl211amt')"
          >
            {{ _cptCumul("bl211amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl211net"
              :data-titre-dlg="_titreDlg('bl211net')"
          >
            {{ _cpt("bl211net") }}
          </td>
          <td class="bl-1"></td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bl-1">12 Résultat</td>
          <td
              data-type-cpt="somme"
              data-cpt="bl12"
              :data-titre-dlg="_titreDlg('bl12')"
          >
            {{ _cpt("bl12") }}
          </td>
        </tr>
        <tr>
          <td class="bb-thin">213 Constructions</td>
          <td
              class="bb-thin"
              data-type-cpt="histo"
              data-cpt="bl213brut"
              :data-titre-dlg="_titreDlg('bl213brut')"
          >
            {{ _cptCumul("bl213brut") }}
          </td>
          <td
              class="bb-thin"
              data-type-cpt="histo"
              data-cpt="bl213amt"
              :data-titre-dlg="_titreDlg('bl213amt')"
          >
            {{ _cptCumul("bl213amt") }}
          </td>
          <td
              class="bb-thin"
              data-type-cpt="somme"
              data-cpt="bl213net"
              :data-titre-dlg="_titreDlg('bl213net')"
          >
            {{ _cpt("bl213net") }}
          </td>
          <td
              class="bl-1"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtBouP"
              :data-titre-dlg="_titreDlg('blTxtBouP')"
          >
            {{ _texte("blTxtBouP") }}
          </td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bt-1 bl-1 underline">DETTES</td>
          <td class="bt-1"></td>
        </tr>
        <tr class="bb-thin">
          <td>215 Matériel Industriel</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl215brut"
              :data-titre-dlg="_titreDlg('bl215brut')"
          >
            {{ _cptCumul("bl215brut") }}
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="bl215amt"
              :data-titre-dlg="_titreDlg('bl215amt')"
          >
            {{ _cptCumul("bl215amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl215net"
              :data-titre-dlg="_titreDlg('bl215net')"
          >
            {{ _cpt("bl215net") }}
          </td>
          <td class="bl-1">13 Subv. d'invest.</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl13"
              :data-titre-dlg="_titreDlg('bl13')"
          >
            {{ _cptCumul("bl13") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bl-1">15 Provisions</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl15"
              :data-titre-dlg="_titreDlg('bl15')"
          >
            {{ _cptCumul("bl15") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>218 Matériel Inform.</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl218brut"
              :data-titre-dlg="_titreDlg('bl218brut')"
          >
            {{ _cptCumul("bl218brut") }}
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="bl218amt"
              :data-titre-dlg="_titreDlg('bl218amt')"
          >
            {{ _cptCumul("bl218amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl218net"
              :data-titre-dlg="_titreDlg('bl218net')"
          >
            {{ _cpt("bl218net") }}
          </td>
          <td class="bl-1">16 Emprunts LT</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl16"
              :data-titre-dlg="_titreDlg('bl16')"
          >
            {{ _cptCumul("bl16") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>26, 27 Financières</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl26_27brut"
              :data-titre-dlg="_titreDlg('bl26_27brut')"
          >
            {{ _cptCumul("bl26_27brut") }}
          </td>
          <td
              data-type-cpt="histo"
              data-cpt="bl26_27amt"
              :data-titre-dlg="_titreDlg('bl26_27amt')"
          >
            {{ _cptCumul("bl26_27amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl26_27net"
              :data-titre-dlg="_titreDlg('bl26_27net')"
          >
            {{ _cpt("bl26_27net") }}
          </td>
          <td class="bl-1"></td>
          <td></td>
        </tr>
        <tr>
          <td>Sous-Total</td>
          <td
              data-type-cpt="somme"
              data-cpt="blSttActBrut"
              :data-titre-dlg="_titreDlg('blSttActBrut')"
          >
            {{ _cpt("blSttActBrut") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="blSttActAmt"
              :data-titre-dlg="_titreDlg('blSttActAmt')"
          >
            {{ _cpt("blSttActAmt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="blSttActNet"
              :data-titre-dlg="_titreDlg('blSttActNet')"
          >
            {{ _cpt("blSttActNet") }}
          </td>
          <td class="bl-1">Sous-Total</td>
          <td
              data-type-cpt="somme"
              data-cpt="blSttPsf"
              :data-titre-dlg="_titreDlg('blSttPsf')"
          >
            {{ _cpt("blSttPsf") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td class="bt-1 underline">STOCKS</td>
          <td class="bt-1"></td>
          <td class="bt-1"></td>
          <td class="bt-1"></td>
          <td class="bt-1 bl-1 underline">DETTES à court terme</td>
          <td class="bt-1"></td>
        </tr>
        <tr class="bb-thin">
          <td>35 Produits finis</td>
          <td
              data-type-cpt="text-somme"
              data-cpt-text="bl35brutTextAdd"
              data-cpt="bl35brut"
              :data-titre-dlg="_titreDlg('bl35brut')"
          >
            {{ _cpt("bl35brut") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl35amt"
              :data-titre-dlg="_titreDlg('bl35amt')"
          >
            {{ _cpt("bl35amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl35net"
              :data-titre-dlg="_titreDlg('bl35net')"
          >
            {{ _cpt("bl35net") }}
          </td>
          <td class="bl-1">40 Dettes Fournis.</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl40"
              :data-titre-dlg="_titreDlg('bl40')"
          >
            {{ _cptCumul("bl40") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td class="underline">CRÉANCES</td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bl-1">44 Dettes d'état</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl44"
              :data-titre-dlg="_titreDlg('bl44')"
          >
            {{ _cptCumul("bl44") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td>41 Créances Clients</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl41brut"
              :data-titre-dlg="_titreDlg('bl41brut')"
          >
            {{ _cptCumul("bl41brut") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl41amt"
              :data-titre-dlg="_titreDlg('bl41amt')"
          >
            {{ _cpt("bl41amt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl41net"
              :data-titre-dlg="_titreDlg('bl41net')"
          >
            {{ _cpt("bl41net") }}
          </td>
          <td class="bl-1">45 Cpt. Cour. Associés</td>
          <td
              data-type-cpt="histo"
              data-cpt="bl45"
              :data-titre-dlg="_titreDlg('bl45')"
          >
            {{ _cptCumul("bl45") }}
          </td>
        </tr>
        <tr class="bb-thin">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td
              class="bl-1"
              :style="{ color: $clrTexte[numJoueurAffiche] }"
              data-type-cpt="text"
              data-cpt="blTxtPret"
              :data-titre-dlg="_titreDlg('blTxtPret')"
          >
            {{ _texte("blTxtPret") }}
          </td>
          <td></td>
        </tr>
        <tr class="bb-thin">
          <td class="underline">TRÉSORERIE active</td>
          <td></td>
          <td></td>
          <td></td>
          <td class="bl-1 underline">TRÉSORERIE passive</td>
          <td></td>
        </tr>
        <tr>
          <td>51 Banque</td>
          <td
              data-type-cpt="somme"
              data-cpt="bl51actBrut"
              :data-titre-dlg="_titreDlg('bl51actBrut')"
          >
            {{ _cpt("bl51actBrut") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl51actAmt"
              :data-titre-dlg="_titreDlg('bl51actAmt')"
          >
            {{ _cpt("bl51actAmt") }}
          </td>
          <td
              data-type-cpt="somme"
              data-cpt="bl51actNet"
              :data-titre-dlg="_titreDlg('bl51actNet')"
          >
            {{ _cpt("bl51actNet") }}
          </td>
          <td class="bl-1">51 Banque</td>
          <td
              data-type-cpt="somme"
              data-cpt="bl51psf"
              :data-titre-dlg="_titreDlg('bl51psf')"
          >
            {{ _cpt("bl51psf") }}
          </td>
        </tr>
        <tr>
          <td class="bt-1 bb-1 font-weight-bold">Total ACTIF</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="blTtActBrut"
              :data-titre-dlg="_titreDlg('blTtActBrut')"
          >
            {{ _cpt("blTtActBrut") }}
          </td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="blTtActAmt"
              :data-titre-dlg="_titreDlg('blTtActAmt')"
          >
            {{ _cpt("blTtActAmt") }}
          </td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="blTtActNet"
              :data-titre-dlg="_titreDlg('blTtActNet')"
          >
            {{ _cpt("blTtActNet") }}
          </td>
          <td class="bt-1 bb-1 bl-1 font-weight-bold">Total PASSIF</td>
          <td
              class="bt-1 bb-1"
              data-type-cpt="somme"
              data-cpt="blTtPsf"
              :data-titre-dlg="_titreDlg('blTtPsf')"
          >
            {{ _cpt("blTtPsf") }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <DialogBilan
        type="bilan"
        :titre-dlg="titreDlg"
        :cpt="cpt"
        :cptText="cptText"
        :type-cpt="typeCpt"
    />
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import DialogBilan from "./DialogBilan";

export default {
  name: "Bilan",
  components: {DialogBilan},
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
      "_texte",
      "_cpt",
      "_cptCumul",
      "_canIplay"
    ]),
    ...mapState(["$clrTexte", "annee", "anneeAffichee", "numJoueurAffiche"]),
  },
  methods: {
    editer(evt) {
      if (!this._canIplay) return;

      this.$store.commit("mState", {prop: "journal", vl: "bilan"})

      if (evt.target.getAttribute("data-cpt")) {
        this.cpt = evt.target.getAttribute("data-cpt");
        this.cptText = evt.target.getAttribute("data-cpt-text");
        this.titreDlg = evt.target.getAttribute("data-titre-dlg");
        this.typeCpt = evt.target.getAttribute("data-type-cpt");
        this.$store.commit("dialogBilan", true);
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