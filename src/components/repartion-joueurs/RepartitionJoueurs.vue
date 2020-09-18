<template>
  <div>
    <h4 class="mb-4">Participants à la formation : {{ $store.state.codeFormation }}</h4>
    <div class="repartition-joueurs d-flex">
      <div>
        <h5>Plateau 1</h5>
        <div class="mt-2 body-2" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_1)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 2</h5>
        <div class="mt-2" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_2)" :key="index">{{ user.nom }}</div>
      </div>
      <div class="ml-5">
        <h5>Plateau 3</h5>
        <div class="mt-2" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_3)" :key="index">{{ user.nom }}</div>
      </div>
      <div class="ml-5">
        <h5>Plateau 4</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_4)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 5</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_5)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 6</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_6)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 7</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_7)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 8</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_8)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 9</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_9)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
      <div class="ml-5">
        <h5>Plateau 10</h5>
        <div class="mt-2 caption" v-for="(user, index) in trierLesJoueurDuPlateau(plateau_10)" :key="index">{{
            user.nom
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { mapState, mapMutations } from "vuex";

export default {
  name: "RepartitionJoueurs",
  data() {
    return {
      plateau_1: [],
      plateau_2: [],
      plateau_3: [],
      plateau_4: [],
      plateau_5: [],
      plateau_6: [],
      plateau_7: [],
      plateau_8: [],
      plateau_9: [],
      plateau_10: [],
    }
  },
  created() {

    // Référence la collection Firebase qu'on écoute.
    let ref = db.collection("users")
        .where("codeFormation", "==", this.$store.state.codeFormation);

    // Le gestionnaire de la collection écoutée.
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {

        // "added" pour les participants à la formation.
        // "modified" pour le formateurs qui est aussi sue un plateau.
        if (change.type === "added" || change.type === "modified") {
          let user = change.doc.data();

          this[`plateau_${user.numPlateau}`].push({
            codeFormation: user.codeFormation,
            isAdmin: user.isAdmin,
            email: user.email,
            nom: user.nom,
            numPlateau: user.numPlateau,
            prenom: user.prenom,
            role: user.role,
            slugID: user.slugID,
            timestamp: user.timestamp,
            userID: user.userID
          });
        }
      })
    });

    // -------------------------------------------------------
    // Référence la collection Firebase qu'on écoute.

    let initDuFormateur = db.collection("init_formateur");

    // Le gestionnaire de la collection écoutée.
    initDuFormateur.onSnapshot(snapshot => {

      snapshot.docChanges().forEach(change => {

        if (change.type === "added") {

          let actionFormateur = change.doc.data();

          if (actionFormateur.startFormation && localStorage.getItem("role") === "participant") {

            const numPlateau = localStorage.getItem("numPlateau");
            const slugID = localStorage.getItem("slugID");
            const codeFormation = localStorage.getItem("codeFormation");

            const plateau = this[`plateau_${numPlateau}`].slice();

            // On trie le tableau en ordre croissssant.
            // Comme ça tout le monde à le même tri !!!
            plateau.sort((a, b) => a.timestamp - b.timestamp);

            const nbrJoueursSurMonPlateau = plateau.length

            let numJoueur = 0;
            for (let i = 0; i < nbrJoueursSurMonPlateau; i++) {

              // On détermine en premier le numJoueur.
              if (plateau[i]["slugID"] === slugID) {
                numJoueur = i;
                this.mState({prop: "numJoueur", vl: numJoueur});
                this.mState({prop: "numJoueurAffiche", vl: numJoueur});
                this.mState({prop: "slugID", vl: plateau[i]["slugID"]});
                this.mState({prop: "userID", vl: plateau[i]["userID"]});
                this.mState({prop: "timestamp", vl: plateau[i]["timestamp"]});
                this.mState({prop: "email", vl: plateau[i]["email"]});
                this.mState({prop: "numPlateau", vl: plateau[i]["numPlateau"]});
                this.mState({prop: "annee", vl: 0});
                this.mState({prop: "anneeAffichee", vl: 0});
                this.mState({prop: "nbrEcritures", vl: 0});
                this.mState({prop: "role", vl: plateau[i]["role"]});
                this.mState({prop: "nbrJoueurs", vl: nbrJoueursSurMonPlateau});
                this.mState({prop: "codeFormation", vl: codeFormation});
              }
              this.stateArrayMutation({prop: "noms", index: i, vl: plateau[i]["nom"]});
              this.stateArrayMutation({prop: "prenoms", index: i, vl: plateau[i]["prenom"]});
            }

            const stateJoueur = {
              slugID: this.$store.state.slugID,
              userID: this.$store.state.userID,
              timestamp: Date.now(),
              role: "participant",
              codeFormation: this.$store.state.codeFormation,
              email: this.$store.state.email,
              numJoueur: this.$store.state.numJoueur,
              numJoueurAffiche: this.$store.state.numJoueur,
              nbrJoueurs: this.$store.state.nbrJoueurs,
              numPlateau: this.$store.state.numPlateau,
              prenoms: this.$store.state.prenoms,
              noms: this.$store.state.noms,
              isInit: true,
              isAdmin: this.$store.state.isAdmin,
              // Valeurs qui peuvent changer dans l'état du joueurs.
              annee: 0,
              anneeAffichee: 0,
              nbrEcritures: 0,
            }

            if (this.$route.name !== "Plateau") {
              db.collection("users")
                  .doc(this.$store.state.slugID)
                  .set(JSON.parse(JSON.stringify(stateJoueur)))
                  .then(() => {
                    this.mIsInit(true);
                    this.mCacherLesAutresPions();
                    this.$router.push({name: "Plateau"});
                  })
            }

          } // if (actionFormateur.startFormation && localStorage.getItem("role") === "participant")

        } // if (change.type === "added")

      })
    });
  },
  computed: {
    ...mapState(["codeFormation"])
  },
  methods: {
    ...mapMutations(["stateArrayMutation", "mState", "mRole", "mIsInit", "mCacherLesAutresPions"]),

    trierLesJoueurDuPlateau(arr) {
      return arr.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    }

    /*trierJoueurs_p1(arr) {
      return arr.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    },
    trierJoueurs_p2(arr) {
      return arr.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    },
    trierJoueurs_p3(arr) {
      return arr.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    },
    trierJoueurs_p4(arr) {
      return arr.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    }*/
  }
}
</script>