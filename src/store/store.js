import Vue from "vue";
import Vuex from "vuex";
import evenements_parcours from "./evenements_parcours";
import textes from "./json/textes.json";
import quiz from "./json/quiz.json";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import VuexLocalStorage from "./VuexLocalStorage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Valeurs non partagées avec les autres joueurs du plateau.
    isInit: false,
    slugID: "",
    userID: "",
    timestamp: 0,
    role: null,
    isAdmin: false,
    codeFormation: "",
    email: "",
    numJoueur: 0, // <-- Numéro de celui qui joue sur son écran.
    nbrJoueurs: 0,
    numPlateau: 0,
    noms: ["", "", "", ""],
    prenoms: ["", "", "", ""],
    anneeAffichee: 0, // <- Année affichée qui peut être différentes de celle de l'exercice en cours.
    numJoueurAffiche: 0, // <-- Numéro du joueur qu'on affiche qui peut être différent de numJoueur

    // Valeurs qui peuvent changer dans l'état du joueurs.
    annee: 0, // <-- Année de l'exercice en cours.
    nbrEcritures: 0,

    // ---------------------------------------------------
    // Valeurs partagées avec les autres joueurs du plateau.
    joueurs: {
      position: [0, 0, 0, 0],
      tresorerie: [0, 0, 0, 0],
      report: [0, 0, 0, 0],
      stock: [0, 0, 0, 0],
      hasGrdT: [false, false, false, false],
      hasPtT: [false, false, false, false],
      hasGrdtAt0: [false, false, false, false],
      hasGrdtAt1: [false, false, false, false],
      hasGrdtAt2: [false, false, false, false],
      hasGrdtAt3: [false, false, false, false],
      hasGrdtAt4: [false, false, false, false],
      hasPttAt0: [false, false, false, false],
      hasPttAt1: [false, false, false, false]
    },
    ecritures: {
      grandJournal: [[[], [], [], []], [[], [], [], []]],
      crTxtChg1: [["•••", "•••", "•••", "•••"], ["Dépenses de l'ACTIVITÉ", "Dépenses de l'ACTIVITÉ", "Dépenses de l'ACTIVITÉ", "Dépenses de l'ACTIVITÉ"]],
      crTxtChg2: [["•••", "•••", "•••", "•••"], ["CHARGES", "CHARGES", "CHARGES", "CHARGES"]],
      cr60: [[[], [], [], []], [[], [], [], []]],
      crTxtChg3: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      cr603: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr603TextAdd: [["", "", "", ""], ["", "", "", ""]],
      cr61: [[[], [], [], []], [[], [], [], []]],
      cr62: [[[], [], [], []], [[], [], [], []]],
      cr63: [[[], [], [], []], [[], [], [], []]],
      cr64: [[[], [], [], []], [[], [], [], []]],
      crSttChg: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr65: [[[], [], [], []], [[], [], [], []]],
      cr68: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr66: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr67: [[[], [], [], []], [[], [], [], []]],
      crTtChg: [[0, 0, 0, 0], [0, 0, 0, 0]],
      crBb: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr69: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr69TextAdd: [["", "", "", ""], ["", "", "", ""]],
      cr12BN: [[0, 0, 0, 0], [0, 0, 0, 0]],
      crTxtPrd1: [["•••", "•••", "•••", "•••"], ["Recettes de l'ACTIVITÉ", "Recettes de l'ACTIVITÉ", "Recettes de l'ACTIVITÉ", "Recettes de l'ACTIVITÉ"]],
      crTxtPrd2: [["•••", "•••", "•••", "•••"], ["PRODUITS", "PRODUITS", "PRODUITS", "PRODUITS"]],
      cr70: [[[], [], [], []], [[], [], [], []]],
      crTxtPrd3: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      cr71Txt: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      cr71: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr71TextAdd: [["", "", "", ""], ["", "", "", ""]],
      cr72: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr74: [[0, 0, 0, 0], [0, 0, 0, 0]],
      crSttPrd: [[0, 0, 0, 0], [0, 0, 0, 0]],
      crTxtPrd4: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      cr78: [[0, 0, 0, 0], [0, 0, 0, 0]],
      crTxtPrd5: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      cr76: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr77: [[[], [], [], []], [[], [], [], []]],
      crTtProd: [[0, 0, 0, 0], [0, 0, 0, 0]],
      cr12p: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTxtAct1: [["•••", "•••", "•••", "•••"], ["Où est l'ARGENT", "Où est l'ARGENT", "Où est l'ARGENT", "Où est l'ARGENT"]],
      blTxtAct2: [["•••", "•••", "•••", "•••"], ["ACTIF", "ACTIF", "ACTIF", "ACTIF"]],
      bl205brut: [[[], [], [], []], [[], [], [], []]],
      bl205amt: [[[], [], [], []], [[], [], [], []]],
      bl205net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl211brut: [[[], [], [], []], [[], [], [], []]],
      bl211amt: [[[], [], [], []], [[], [], [], []]],
      bl211net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl213brut: [[[], [], [], []], [[], [], [], []]],
      bl213amt: [[[], [], [], []], [[], [], [], []]],
      bl213net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl215brut: [[[], [], [], []], [[], [], [], []]],
      bl215amt: [[[], [], [], []], [[], [], [], []]],
      bl215net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl218brut: [[[], [], [], []], [[], [], [], []]],
      bl218amt: [[[], [], [], []], [[], [], [], []]],
      bl218net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl26_27brut: [[[], [], [], []], [[], [], [], []]],
      bl26_27amt: [[[], [], [], []], [[], [], [], []]],
      bl26_27net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blSttActBrut: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blSttActAmt: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blSttActNet: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl35brut: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl35brutTextAdd: [["", "", "", ""], ["", "", "", ""]],
      bl35amt: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl35net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl41brut: [[[], [], [], []], [[], [], [], []]],
      bl41amt: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl41net: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl51actBrut: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl51actAmt: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl51actNet: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTtActBrut: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTtActAmt: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTtActNet: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTxtPsf1: [["•••", "•••", "•••", "•••"], ["D'Où vient l'ARGENT", "D'Où vient l'ARGENT", "D'Où vient l'ARGENT", "D'Où vient l'ARGENT"]],
      blTxtPsf2: [["•••", "•••", "•••", "•••"], ["PASSIF", "PASSIF", "PASSIF", "PASSIF"]],
      bl10: [[[], [], [], []], [[], [], [], []]],
      blTxtReserve: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      bl11: [[[], [], [], []], [[], [], [], []]],
      bl12: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTxtBouP: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      bl13: [[[], [], [], []], [[], [], [], []]],
      bl15: [[[], [], [], []], [[], [], [], []]],
      bl16: [[[], [], [], []], [[], [], [], []]],
      blSttPsf: [[0, 0, 0, 0], [0, 0, 0, 0]],
      bl40: [[[], [], [], []], [[], [], [], []]],
      bl44: [[[], [], [], []], [[], [], [], []]],
      bl45: [[[], [], [], []], [[], [], [], []]],
      blTxtPret: [["•••", "•••", "•••", "•••"], ["•••", "•••", "•••", "•••"]],
      bl51psf: [[0, 0, 0, 0], [0, 0, 0, 0]],
      blTtPsf: [[0, 0, 0, 0], [0, 0, 0, 0]]
    },

    // ---------------------------------------------------
    // Valeurs pour le fonctionnement du jeu.
    isLogin: false,
    isElearning: false,
    journal: "", // <-- Journal sélectionné à l'ouverture d'un Dialog pour une écriture.
    annulerChangementAnnee: false,
    dialogBilan: false,
    dialogCr: false,
    dialogJournal: false,
    dialogAnnee: false,
    offCanvasElearning: false,
    voirLaRepartition: false,
    usersActions: "users_actions", // <-- Nom de la collection Firebase pour les actions des participants.

    // ---------------------------------------------------
    quiz: {...quiz},
    reponses: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],


    // ---------------------------------------------------
    // Valeurs statique ou pour le fonctionnement du jeu.
    ...evenements_parcours,
    titresDialogues: {...textes},
    $clrActifOff: ["#A5D6A7", "#FFCF83", "#F8BBD0", "#a1c7eb"],
    $clrActifOn: ["#44A044", "#FFA000", "#EC407A", "#1E88E5"],
    $clrTexte: ["#388E3C", "#F47F00", "#E91E63", "#1E88E5"],
    $bgBar: "#273492"
  },
  getters,
  mutations,
  actions,
  plugins: [VuexLocalStorage]
});
