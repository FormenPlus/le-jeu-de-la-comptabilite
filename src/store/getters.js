/*
 * myFonction: () => {}
 *
 * myFonction: state => {}
 * myFonction: state => params => {}
 *
 * myFonction: (state, getters) => {}
 * myFonction: (state, getters) => params {}
 *
 * */
export default {

  _report: state => {
    return state.anneeAffichee === 0 ? "" : state.joueurs.report[state.numJoueurAffiche];
  },

  // Getter générique sur les propriétés simple du joueur.
  _jr: state => (prop, _numJoueur) => {
    return state.joueurs[prop][_numJoueur];
  },
  _canIplay: state => {
    return state.annee === state.anneeAffichee
        && state.numJoueur === state.numJoueurAffiche;
  },
  //
  _posJoueur: (state) => {
    return state.joueurs.position[state.numJoueur];
  },
  _nomsJoueurs: state => {
    let joueurs = [];
    const lng = state.nbrJoueurs;
    for (let i = 0; i < lng; i++) {
      joueurs.push(state.prenoms[i]);
    }
    return joueurs;
  },
  codeFormation: (state) => {
    return state.codeFormation;
  },
  posJoueurs: (state) => {
    return [
      state.joueurs.position[0],
      state.joueurs.position[1],
      state.joueurs.position[2],
      state.joueurs.position[3],
    ];
  },

  // -------------------------------------------------
  // Journaux Bilan && Cr

  // Titre des composants de dialogue dans les journaux.
  _titreDlg: (state) => (cpt) => {
    return state["titresDialogues"][cpt];
  },

  // Textes libres des journaux.
  _texte: (state) => (cpt) => {
    return state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche];
  },

  // Valeur du compte.
  // Dans l'application toutes les entrées des journauxu
  // sont considérées comme des comptes... même les textes libres !
  _cpt: (state) => (cpt) => {
    return state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche] === 0
        ? ""
        : state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche];
  },

  // Affichage des valeurs cumulées d'un compte avec historique.
  _cptCumul: (state) => (cpt) => {
    const somme = state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche]
        .reduce((acc, valeur) => acc + valeur, 0) ;
    return somme === 0 ? "" : somme;
  },

  // Retourne dans les dialogues les écritures d'un compte avec historique.
  _historiqueDuCpt: (state) => (cpt) => {
    const nbrEcritres =
        state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche].length;
    return nbrEcritres > 0
        ? state.ecritures[cpt][state.anneeAffichee][state.numJoueurAffiche]
        : "";
  },

  _ecrituresDuGrdJournal: (state) => {
    return state.ecritures.grandJournal[state.anneeAffichee][state.numJoueurAffiche]
    // return state[`cptAn${state.anneeAffichee}${state.numJoueurAffiche}`][
    //     "grandJournal"
    //     ];
  },

  _ecritureUpdateDuGrdJournal: (state) => (num) => {
    return state.ecritures.grandJournal[state.anneeAffichee][state.numJoueurAffiche][num];
    // return state[`cptAn${state.anneeAffichee}${state.numJoueurAffiche}`][
    //     "grandJournal"
    //     ][num];
  },

  // -------------------------------------------------

  // Le texte court de l'évènement dans la BottomBar
  _shortTextEvt: (state) => {
    return state.evtsParcours[state.joueurs.position[state.numJoueur]].shortText;
  }
};
