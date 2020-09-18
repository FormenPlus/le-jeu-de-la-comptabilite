import Vue from 'vue'
/*
 * myFonction(state, payload) {}
 *
 * */
export default {
  // Mutateur générique pour les valeurs simples du joueur.
  // payload : { prop: [String], vl: [String || Number, typeOperation: [String] }
  mJoueur(state, payload) {
    let val = payload.vl;
    if (payload.typeOperation === "+") {
      val += state.joueurs[payload.prop][payload.numJoueur];
    }
    Vue.set(state.joueurs[payload.prop], payload.numJoueur, val);
  },


  // Mutation d'une propriété simple.
  // { prop: String, vl: [String || Number || Boolean] }
  mState(state, payload) {
    state[payload.prop] = payload.vl;
  },
  // Mutation d'un tableau.
  // { prop: String, index: Number, vl: [String || Number || Boolean] }
  stateArrayMutation(state, payload) {
    Vue.set(state[payload.prop], payload.index, payload.vl);
  },

  mJoueurAffiche(state, num) {
    state.numJoueurAffiche = num;
  },
  changerAnnee(state) {
    state.annee = 1;
    state.anneeAffichee = 1;
    // Passe le nombre d'écritures à plus de 6 pour empêcher l'édition
    // dans le formulaire du grand journal.
    state.nbrEcritures = 10;
  },
  annulerLeRole(state) {
    state.role = null;
  },
  enregistreLeCodeFormation(state, codeFormateur) {
    const now = new Date();
    const myDate = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
    state.codeFormation = `${codeFormateur}${myDate}`;
  },

  initialiseLeJeu(state, val) {
    state.isInit = val;
  },

  avancerLePionDuJoueur(state, payload) {
    Vue.set(state.joueurs.position, payload.numJoueur, payload.vl);
  },

  // Cache les pions du parcours quand il n'y en a pas 4 sur le plateau.
  mCacherLesAutresPions(state) {
    if (state.nbrJoueurs === 1) {
      state.joueurs.position[1] = -1;
      state.joueurs.position[2] = -1;
      state.joueurs.position[3] = -1;
    } else if (state.nbrJoueurs === 2) {
      state.joueurs.position[2] = -1;
      state.joueurs.position[3] = -1;
    } else if (state.nbrJoueurs === 3) {
      state.joueurs.position[3] = -1;
    }
  },

  ecrireAuGrandJournal(state, payload) {
    state.ecritures.grandJournal[payload.annee][payload.numJoueur].push(payload);
    state.joueurs.tresorerie[payload.numJoueur] = payload.solde;
  },

  updateGrandJournal(state, ecritures) {
    const annee = ecritures[0].annee;
    const numJoueur = ecritures[0].numJoueur;

    // Vide le tableau du joueur puisque toutes ses données peuvent changer
    // (le solde de toutes les lignes plus la ligne qui a été modifiée).
    Vue.set(state.ecritures.grandJournal[annee], numJoueur, []);

    // Remplit à nouveau le tableau du joueur avec les nouvelles données.
    for (let i=0, l=ecritures.length; i < l; i++) {
      state.ecritures.grandJournal[annee][numJoueur].push(ecritures[i]);
      state.joueurs.tresorerie[numJoueur] = ecritures[i].solde;
    }
  },

  ecrireAuBilanOuCr(state, payload) {
    switch (payload.typeCpt) {
      case "text":
        Vue.set(state.ecritures[payload.cpt][payload.annee], payload.numJoueur, payload.texte);
        break;
      case "histo":
        state.ecritures[payload.cpt][payload.annee][payload.numJoueur].push(payload.somme);
        break;
      case "somme":
      case "text-somme":
        Vue.set(state.ecritures[payload.cpt][payload.annee], payload.numJoueur, payload.somme);
        if (payload.typeCpt === "text-somme") {
          Vue.set(state.ecritures[payload.cptText][payload.annee], payload.numJoueur, payload.texte);
        }
        break;
    }
  },
  // --------------------------------------

  dialogBilan(state, payload) {
    state.dialogBilan = payload;
  },
  dialogCr(state, payload) {
    state.dialogCr = payload;
  },
  dialogJournal(state, payload) {
    state.dialogJournal = payload;
  },

  // --------------------------------------
  mLogin(state) {
    state.isLogin = true;
  },
  mLogout(state) {
    state.isLogin = false;
  },
  mRole(state, role) {
    state.role = role;
  },
  mIsInit(state, payload) {
    state.isInit = payload;
  },

  // --------------------------------------

  mInitVisiteur(state, user) {
    state.role = user.role;
    state.noms[0] = user.role === "visiteur" ? "Anonyme" : user.nom;
    state.prenoms[0] = user.role === "visiteur" ? "Visiteur" : user.prenom;
    state.nbrJoueurs = 1;
    state.numJoueur = 0;
    state.isInit = true;
    state.numPlateau = 1;
    localStorage.clear();
    localStorage.setItem("role", user.role);
  },

  // --------------------------------------

  mConfigurerLeParticipant(state, user) {
    state.annee = user.annee;
    state.anneeAffichee = user.anneeAffichee;
    state.codeFormation = user.codeFormation;
    state.email = user.email;
    state.isInit = user.isInit;
    state.nbrEcritures = user.nbrEcritures;
    state.nbrJoueurs = user.nbrJoueurs;
    state.numJoueur = user.numJoueur;
    state.numJoueurAffiche = user.numJoueurAffiche;
    state.numPlateau = user.numPlateau;
    state.role = user.role;
    state.isAdmin = user.isAdmin;
    state.slugID = user.slugID;
    state.timestamp = user.timestamp;
    state.userID = user.userID;
    for (let i = 0; i < 4; i++) {
      Vue.set(state["prenoms"], i, user.prenoms[i]);
      Vue.set(state["noms"], i, user.noms[i]);
    }
  },

  // --------------------------------------

  mRaz(state) {
    state.isInit = false;
    state.isLogin = false;
    state.slugID = "";
    state.userID = "";
    state.timestamp = 0;
    state.role = null;
    state.isAdmin = false;
    state.codeFormation = "";
    state.email = "";
    state.numJoueur = 0;
    state.numJoueurAffiche = 0;
    state.nbrJoueurs = 0;
    state.numPlateau = 0;
    state.annee = 0;
    state.anneeAffichee = 0;
    state.annulerChangementAnnee = false;
    state.journal = "";
    state.nbrEcritures = 0;

    for (let n = 0; n < 27; n++) {
      Vue.set(state.reponses, n, null);
    }

    for (let i = 0; i < 4; i++) {
      Vue.set(state.noms, i, "");
      Vue.set(state.prenoms, i, "");

      Vue.set(state.joueurs.position, i, 0);
      Vue.set(state.joueurs.tresorerie, i, 0);
      Vue.set(state.joueurs.report, i, 0);
      Vue.set(state.joueurs.stock, i, 0);
      Vue.set(state.joueurs.hasGrdT, i, false);
      Vue.set(state.joueurs.hasPtT, i, false);
      Vue.set(state.joueurs.hasGrdtAt0, i, false);
      Vue.set(state.joueurs.hasGrdtAt1, i, false);
      Vue.set(state.joueurs.hasGrdtAt2, i, false);
      Vue.set(state.joueurs.hasGrdtAt3, i, false);
      Vue.set(state.joueurs.hasGrdtAt4, i, false);
      Vue.set(state.joueurs.hasPttAt0, i, false);
      Vue.set(state.joueurs.hasPttAt1, i, false);
    }

    for (let annee = 0; annee < 2; annee++) {

      for (let idx = 0; idx < 4; idx++) {
        Vue.set(state.ecritures.grandJournal[annee], idx, []);
        Vue.set(state.ecritures.crTxtChg1[annee], idx, annee === 0 ? "•••" : "Dépenses de l'ACTIVITÉ");
        Vue.set(state.ecritures.crTxtChg2[annee], idx, annee === 0 ? "•••" : "CHARGES");
        Vue.set(state.ecritures.cr60[annee], idx, []);
        Vue.set(state.ecritures.crTxtChg3[annee], idx, "•••");
        Vue.set(state.ecritures.cr603[annee], idx, 0);
        Vue.set(state.ecritures.cr603TextAdd[annee], idx, "");
        Vue.set(state.ecritures.cr61[annee], idx, []);
        Vue.set(state.ecritures.cr62[annee], idx, []);
        Vue.set(state.ecritures.cr63[annee], idx, []);
        Vue.set(state.ecritures.cr64[annee], idx, []);
        Vue.set(state.ecritures.crSttChg[annee], idx, 0);
        Vue.set(state.ecritures.cr65[annee], idx, []);
        Vue.set(state.ecritures.cr68[annee], idx, 0);
        Vue.set(state.ecritures.cr66[annee], idx, 0);
        Vue.set(state.ecritures.cr67[annee], idx, []);
        Vue.set(state.ecritures.crTtChg[annee], idx, 0);
        Vue.set(state.ecritures.crBb[annee], idx, 0);
        Vue.set(state.ecritures.cr69[annee], idx, 0);
        Vue.set(state.ecritures.cr69TextAdd[annee], idx, "");
        Vue.set(state.ecritures.cr12BN[annee], idx, 0);
        Vue.set(state.ecritures.crTxtPrd1[annee], idx, annee === 0 ? "•••" : "Recettes de l'ACTIVITÉ");
        Vue.set(state.ecritures.crTxtPrd2[annee], idx, annee === 0 ? "•••" : "PRODUITS");
        Vue.set(state.ecritures.cr70[annee], idx, []);
        Vue.set(state.ecritures.crTxtPrd3[annee], idx, "•••");
        Vue.set(state.ecritures.cr71Txt[annee], idx, "•••");
        Vue.set(state.ecritures.cr71[annee], idx, 0);
        Vue.set(state.ecritures.cr71TextAdd[annee], idx, "");
        Vue.set(state.ecritures.cr72[annee], idx, 0);
        Vue.set(state.ecritures.cr74[annee], idx, 0);
        Vue.set(state.ecritures.crSttPrd[annee], idx, 0);
        Vue.set(state.ecritures.crTxtPrd4[annee], idx, "•••");
        Vue.set(state.ecritures.cr78[annee], idx, 0);
        Vue.set(state.ecritures.crTxtPrd5[annee], idx, "•••");
        Vue.set(state.ecritures.cr76[annee], idx, 0);
        Vue.set(state.ecritures.cr77[annee], idx, []);
        Vue.set(state.ecritures.crTtProd[annee], idx, 0);
        Vue.set(state.ecritures.cr12p[annee], idx, 0);
        Vue.set(state.ecritures.blTxtAct1[annee], idx, annee === 0 ? "•••" : "Où est l'ARGENT");
        Vue.set(state.ecritures.blTxtAct2[annee], idx, annee === 0 ? "•••" : "ACTIF");
        Vue.set(state.ecritures.bl205brut[annee], idx, []);
        Vue.set(state.ecritures.bl205amt[annee], idx, []);
        Vue.set(state.ecritures.bl205net[annee], idx, 0);
        Vue.set(state.ecritures.bl211brut[annee], idx, []);
        Vue.set(state.ecritures.bl211amt[annee], idx, []);
        Vue.set(state.ecritures.bl211net[annee], idx, 0);
        Vue.set(state.ecritures.bl213brut[annee], idx, []);
        Vue.set(state.ecritures.bl213amt[annee], idx, []);
        Vue.set(state.ecritures.bl213net[annee], idx, 0);
        Vue.set(state.ecritures.bl215brut[annee], idx, []);
        Vue.set(state.ecritures.bl215amt[annee], idx, []);
        Vue.set(state.ecritures.bl215net[annee], idx, 0);
        Vue.set(state.ecritures.bl218brut[annee], idx, []);
        Vue.set(state.ecritures.bl218amt[annee], idx, []);
        Vue.set(state.ecritures.bl218net[annee], idx, 0);
        Vue.set(state.ecritures.bl26_27brut[annee], idx, []);
        Vue.set(state.ecritures.bl26_27amt[annee], idx, []);
        Vue.set(state.ecritures.bl26_27net[annee], idx, 0);
        Vue.set(state.ecritures.blSttActBrut[annee], idx, 0);
        Vue.set(state.ecritures.blSttActAmt[annee], idx, 0);
        Vue.set(state.ecritures.blSttActNet[annee], idx, 0);
        Vue.set(state.ecritures.bl35brut[annee], idx, 0);
        Vue.set(state.ecritures.bl35brutTextAdd[annee], idx, "");
        Vue.set(state.ecritures.bl35amt[annee], idx, 0);
        Vue.set(state.ecritures.bl35net[annee], idx, 0);
        Vue.set(state.ecritures.bl41brut[annee], idx, []);
        Vue.set(state.ecritures.bl41amt[annee], idx, 0);
        Vue.set(state.ecritures.bl41net[annee], idx, 0);
        Vue.set(state.ecritures.bl51actBrut[annee], idx, 0);
        Vue.set(state.ecritures.bl51actAmt[annee], idx, 0);
        Vue.set(state.ecritures.bl51actNet[annee], idx, 0);
        Vue.set(state.ecritures.blTtActBrut[annee], idx, 0);
        Vue.set(state.ecritures.blTtActAmt[annee], idx, 0);
        Vue.set(state.ecritures.blTtActNet[annee], idx, 0);
        Vue.set(state.ecritures.blTxtPsf1[annee], idx, annee === 0 ? "•••" : "D'Où vient l'ARGENT");
        Vue.set(state.ecritures.blTxtPsf2[annee], idx, annee === 0 ? "•••" : "PASSIF");
        Vue.set(state.ecritures.bl10[annee], idx, []);
        Vue.set(state.ecritures.blTxtReserve[annee], idx, "•••");
        Vue.set(state.ecritures.bl11[annee], idx, []);
        Vue.set(state.ecritures.bl12[annee], idx, 0);
        Vue.set(state.ecritures.blTxtBouP[annee], idx, "•••");
        Vue.set(state.ecritures.bl13[annee], idx, []);
        Vue.set(state.ecritures.bl15[annee], idx, []);
        Vue.set(state.ecritures.bl16[annee], idx, []);
        Vue.set(state.ecritures.blSttPsf[annee], idx, 0);
        Vue.set(state.ecritures.bl40[annee], idx, []);
        Vue.set(state.ecritures.bl44[annee], idx, []);
        Vue.set(state.ecritures.bl45[annee], idx, []);
        Vue.set(state.ecritures.blTxtPret[annee], idx, "•••");
        Vue.set(state.ecritures.bl51psf[annee], idx, 0);
        Vue.set(state.ecritures.blTtPsf[annee], idx, 0);
      }
    }

    localStorage.clear();
  }

};
