import firebase from "firebase";
import db from "../firebase/init";
import Vue from "vue";
/*
 * myFonction({ state, dispatch, commit, getters } payload) {}
 *
 * */
export default {
  fetchUser(context, payload) {
    return db
        .collection(payload.collection)
        .doc(payload.slugID)
        .get()
        .then(doc => {
          if (doc.exists) {
            return doc.data();
          }
        })
        .catch(error => {
          console.log("Il ya un problème avec fetchUser", error);
          return false;
        });
  },
  signIn({commit}, payload) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          return true;
        })
        .catch(error => {
          console.log("Il y a un proplème avec la connexion !");
          return false;
        });
  },
  signOut({commit}) {
    return firebase
        .auth()
        .signOut()
        .then(() => {
          commit("mRaz");
          return true;
        })
        .catch(error => {
          // commit("setError", error.message);
          return false;
        });
  },

  actionJoueur({state, commit}, payload) {
    commit("mJoueur", payload);
    if (state.role === "participant") {
      payload.codeFormation = state.codeFormation;
      payload.timestamp = Date.now();
      db.collection(state.usersActions).add(payload);
    }
  },

  avancerLePionDuJoueur({state, commit}) {

    const random_1 = Math.floor(Math.random() * (7 - 1) + 1);
    const random_2 = Math.floor(Math.random() * (7 - 1) + 1);
    const nbrSteps = random_1 + random_2;
    // const nbrSteps = 1;
    let position = state.joueurs.position[state.numJoueur] + nbrSteps;

    if (position > 35) {
      position -= 36;
    }

    const dataPosition = {
      numPlateau: state.numPlateau,
      type: "joueurs",
      numJoueur: state.numJoueur,
      prop: "position",
      vl: position,
      typeOperation: "=",
      codeFormation: state.codeFormation,
      timestamp: Date.now()
    };

    commit("avancerLePionDuJoueur", dataPosition);

    if (state.role === "participant") {
      db.collection(state.usersActions).add(dataPosition);
    }
  },

  ecrireAuBilanOuCr({state, commit}, payload) {
    commit("ecrireAuBilanOuCr", payload);
    if (state.role === "participant") {
      payload.timestamp = Date.now();
      db.collection(state.usersActions).add(payload);
    }
  },

  ecrireAuGrandJournal({state, getters, commit}, payload) {
    const soldeActuel = state.joueurs.tresorerie[payload.numJoueur];
    payload.index = state.ecritures.grandJournal[payload.annee][payload.numJoueur].length;
    payload.solde = (payload.recette - payload.depense) + soldeActuel;

    if (state.nbrEcritures < 7) {
      commit("mState", {prop: "nbrEcritures", vl: state.nbrEcritures + 1});
    }

    commit("ecrireAuGrandJournal", payload);

    if (state.role === "participant") {

      if (state.nbrEcritures < 7) {
        const slugID = localStorage.getItem("slugID");
        const codeFormation = localStorage.getItem("codeFormation");

        db.collection("users").doc(state.slugID).update({nbrEcritures: state.nbrEcritures});

      }

      const dataEcriture = {
        ...payload,
        type: "ecritures",
        cpt: "grandJournal",
        codeFormation: state.codeFormation,
        timestamp: Date.now()
      }

      const dataTresorerie = {
        numPlateau: payload.numPlateau,
        type: "joueurs",
        numJoueur: payload.numJoueur,
        prop: "tresorerie",
        vl: payload.solde,
        typeOperation: "=",
        codeFormation: state.codeFormation,
        timestamp: Date.now()
      };

      db.collection(state.usersActions).add(dataTresorerie);
      db.collection(state.usersActions).add(dataEcriture);
    }
  },

  updateGrandJournal({state, commit}, payload) {

    // const ecritures = JSON.parse(JSON.stringify(state.ecritures.grandJournal[payload.annee][payload.numJoueur].slice()));
    const ecritures = [...state.ecritures.grandJournal[payload.annee][payload.numJoueur]];

    let solde = 0
    for (let i = 0, l = ecritures.length; i < l; i++) {
      if (ecritures[i].index === payload.index) {
        ecritures[i].texteCpt = payload.texteCpt;
        ecritures[i].libelle = payload.libelle;
        ecritures[i].depense = payload.depense;
        ecritures[i].recette = payload.recette;
      }

      solde = (ecritures[i].recette - ecritures[i].depense) + solde;
      ecritures[i].solde = solde;

    }
    commit("updateGrandJournal", ecritures);

    // Seulement si ça ne vient pas du serveur.
    if (state.role === "participant" && !payload.fromServer) {
      const dataUpdateEcriture = {
        ...payload,
        type: "ecritures",
        cpt: "grandJournal",
        codeFormation: state.codeFormation,
        timestamp: Date.now()
      }

      const dataTresorerie = {
        numPlateau: payload.numPlateau,
        type: "joueurs",
        numJoueur: payload.numJoueur,
        prop: "tresorerie",
        vl: solde,
        typeOperation: "=",
        codeFormation: state.codeFormation,
        timestamp: Date.now()
      };

      db.collection(state.usersActions).add(dataTresorerie);
      db.collection(state.usersActions).add(dataUpdateEcriture);
    }
  },

  changerAnnee({state, getters, commit}) {
    // Au changement d'année le solde est toujours égal à la trésorerie.
    const solde = getters._jr("tresorerie", state.numJoueur);

    commit("mJoueur", {prop: "report", vl: solde, typeOperation: "=", numJoueur: state.numJoueur});
    commit("changerAnnee");

    if (state.role === "participant") {
      db.collection("users").doc(state.slugID).update({annee: 1, anneeAffichee: 1, nbrEcritures: 10});

      const dataReport = {
        numPlateau: state.numPlateau,
        type: "joueurs",
        numJoueur: state.numJoueur,
        prop: "report",
        vl: state.joueurs.report[state.numJoueur],
        typeOperation: "=",
        codeFormation: state.codeFormation,
        timestamp: Date.now()
      };
      db.collection(state.usersActions).add(dataReport);
    }
  },

  // ----------------------------------------------------------------------

  // Récupère l'état du participant quand il est connecté.
  // Action déclenché dans main.js ou Connexion.vue
  recupererLetatDuJoueurAction({commit}) {
    const slugID = localStorage.getItem("slugID");

    return db
        .collection("users")
        .doc(slugID)
        .get()
        .then(userDoc => {
          if (userDoc.exists) {
            const user = userDoc.data();
            commit("mState", {prop: "annee", vl: user.annee});
            commit("mState", {prop: "anneeAffichee", vl: user.anneeAffichee});
            commit("mState", {prop: "codeFormation", vl: user.codeFormation});
            commit("mState", {prop: "email", vl: user.email});
            commit("mState", {prop: "isInit", vl: user.isInit});
            commit("mState", {prop: "nbrEcritures", vl: user.nbrEcritures});
            commit("mState", {prop: "nbrJoueurs", vl: user.nbrJoueurs});
            commit("mState", {prop: "numJoueur", vl: user.numJoueur});
            commit("mState", {prop: "numJoueurAffiche", vl: user.numJoueurAffiche});
            commit("mState", {prop: "numPlateau", vl: user.numPlateau});
            commit("mState", {prop: "role", vl: user.role});
            commit("mState", {prop: "isAdmin", vl: user.isAdmin});
            commit("mState", {prop: "slugID", vl: user.slugID});
            commit("mState", {prop: "timestamp", vl: user.timestamp});
            commit("mState", {prop: "userID", vl: user.userID});
            for (let i = 0; i < 4; i++) {
              commit("stateArrayMutation", {prop: "prenoms", index: i, vl: user.prenoms[i]});
              commit("stateArrayMutation", {prop: "noms", index: i, vl: user.noms[i]});
            }
            commit("mCacherLesAutresPions");
          } else {
            console.log("Problème avec recupererLetatDuJoueurAction");
          }
        })
  },
};
