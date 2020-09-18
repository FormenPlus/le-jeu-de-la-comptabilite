<template>
  <div class="bottom-bar bottom-bar-action">

    <Joueur v-for="(prenom, index) in _nomsJoueurs" :key="index" :prenom="prenom" :num="index"/>

    <BtnPlateau/>

    <btn-des class="ml-1"></btn-des>

    <div class="short-text-bottom-bar ml-5">{{ _shortTextEvt }}</div>

    <SelectAnnee class="ml-5"/>

    <FaieLePdf v-show="$route.name === 'Journaux'"/>

    <v-btn dark small text @click="$router.push({name: 'Quiz'})">Quiz</v-btn>

    <v-btn v-show="isElearning" small dark text @click.stop="showElearning">E-learning</v-btn>

    <v-spacer></v-spacer>
    <BtnDashboard v-show="isAdmin" @click="$router.push({name: 'DashboardFormateur'})"/>
    <BtnConnexion v-show="$route.name !== 'ReloadData'"/>
    <FirebaseActionsJoueurs v-if="$store.state.role === 'participant'"/>
  </div>
</template>

<script>
  import FirebaseActionsJoueurs from "../../firebase/FirebaseActionsJoueurs";
  import {mapState, mapGetters} from "vuex";
  import Joueur from "./JoueurBottomBar";
  import BtnDes from "./BtnDes";
  import SelectAnnee from "./SelectAnnee";
  import BtnConnexion from "./BtnConnexion";
  import BtnDashboard from "./BtnDashboard";
  import BtnPlateau from "./BtnPlateau";
  import FaieLePdf from "./FaieLePdf";

  export default {
    name: "BottomBarAction",
    components: {
      Joueur,
      BtnDes,
      SelectAnnee,
      BtnConnexion,
      BtnDashboard,
      BtnPlateau,
      FaieLePdf,
      FirebaseActionsJoueurs
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(["numJoueur", "numJoueurAffiche", "isElearning", "offCanvasElearning", "isAdmin"]),
      ...mapGetters(["_shortTextEvt", "_nomsJoueurs", "_canIplay"]),
      showBtnConnexion() {
        let show = true;
        if (localStorage.getItem("role") === "participant") {
          if (this.$route.name === "ReloadData" || this.$route.name === "Plateau" || this.$route.name === "Journaux") {
            show = false;
          }
        }
        return show;
      }
    },
    methods: {
      showElearning() {
        this.$store.commit("mState", {prop: "offCanvasElearning", vl: !this.offCanvasElearning});
      }
    }
  };
</script>

<style scoped>
  .exercices {
    width: 120px;
  }

  .top-bar .v-input__slot {
    margin: 0 !important;
  }

  .top-bar .v-text-field__details,
  .top-bar .v-messages {
    display: none;
  }

  .v-list-item__title {
    letter-spacing: 0.01rem;
    font-weight: 700;
    font-size: 1rem !important;
  }

  .short-text-bottom-bar {
    height: 30px;
    width: 300px;
    margin: 4px 10px;
    padding: 6px 0 0 5px;
    color: #1A237E;
    font-size: 13px;
    font-weight: 500;
    background: #E8EAF6;
  }

  .joueur-bottom-bar + .joueur-bottom-bar {
    margin-left: 20px;
  }
</style>
