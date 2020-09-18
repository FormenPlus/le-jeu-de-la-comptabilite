<template>
  <div class="accueil">
    <v-container class="_100vh">
      <div class="text-center">
        <logo-fep/>
        <div class="accueil-titre d-inline-block display-2 mt-5 ml-auto mr-auto font-weight-light">
          LA <span class="font-weight-bold orange--text">COMPTABILITÉ</span
        ><br/>SUR UN <span class="font-weight-bold">PLATEAU</span>
          <v-img class="accueil-des" src="../assets/des_ouverture2.jpg"></v-img>
        </div>
      </div>
      <!-- SÉLECTION DES ROLES -->
      <div class="selecteur-role text-center mt-5">
        <p style="width: 640px; margin: 20px auto 0;"><b>Inscrivez-vous</b> si vous n'avez pas encore de compte<br>ou <b>connectez-vous</b> directement selon votre rôle.</p>
        <div class="d-flex justify-space-between" style="width: 640px; margin: 20px auto;">
          <!-- PARTICUPANT -->
          <div class="pa-3" style="width: 300px; background: #EDE7F6; border-radius: 8px;">
            <h4 class="violet--text">Participant</h4>
            <p class="mt-2 mb-2 caption">Accès à votre formation <b>avec formateur</b></p>
            <div>
              <v-btn small text color="#7B458B" dark class="mr-4" @click="goTo('Connexion')">Connexion</v-btn>
              <v-btn small depressed color="#7B458B" dark @click="goTo('InscriptionParticipant')">Inscription</v-btn>
            </div>
          </div>
          <!-- VISITEUR -->
          <div class="pa-3" style="width: 300px; background: #FFF3E0; border-radius: 8px;">
            <h4 class="orange--text-darken">Visiteur</h4>
            <p class="mt-2 mb-2 caption">Utilisez l'application comme <b>simple visiteur</b>.</p>
            <div>
              <v-btn small depressed color="warning" dark @click="entrerCommeVisiteur">Visiteur</v-btn>
            </div>
          </div>
        </div>

        <div class="d-flex justify-space-between" style="width: 640px; margin: 20px auto 0;">
          <!-- FORMATEUR -->
          <div class="pa-3" style="width: 300px; background: #FFF3E0; border-radius: 8px;">
            <h4 class="orange--text-darken">Formateur</h4>
            <p class="mt-2 mb-2 caption">Gérer vos formations</p>
            <v-btn small text color="warning" dark class="mr-4" @click="goTo('Connexion')">Connexion</v-btn>
<!--            <v-btn small depressed color="warning" dark>Inscription</v-btn>-->
          </div>
          <!-- E-LEARNING -->
          <div class="pa-3" style="width: 300px; background: #EDE7F6; border-radius: 8px;">
<!--            <h4 class="orange&#45;&#45;text-darken">E-learning</h4>-->
<!--            <p class="mt-2 mb-2 caption">Accès à votre formation <b>en E-learning</b></p>-->
            <!--        <v-btn small text color="warning" dark class="mr-4">Connexion</v-btn>-->
<!--            <v-btn small depressed color="warning" dark @click="onElearning">E-learning</v-btn>-->
          </div>
        </div>

      </div>


    </v-container>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";
  import LogoFep from "../components/misc/LogoFep";

  export default {
    name: "Accueil",
    components: {
      LogoFep
    },
    data() {
      return {};
    },
    methods: {
      ...mapMutations(["mState", "mCacherLesAutresPions", "mRaz", "mInitVisiteur"]),
      goTo(ecran) {
        this.$router.push({name: ecran});
      },
      entrerCommeVisiteur() {
        localStorage.clear();
        this.mRaz();
        this.mInitVisiteur({role: "visiteur"});
        this.mCacherLesAutresPions();
        this.$router.push({name: "Plateau"});
      },
      onElearning() {
        this.mState({prop: "isElearning", vl: true});
        this.mRaz();
        this.mInitVisiteur({role: "visiteur"});
        this.$router.push({name: "Plateau"});
      }
    },
  };
</script>

<style scoped>
  .accueil {
    position: relative;
  }

  .slogan-home {
    position: absolute;
    bottom: -30px;
    left: 5%;
    width: 200px;
    padding: 20px 0 20px 20px;
    background: #f39200;
    border: 5px solid #ffffff;
    border-bottom-right-radius: 50px;
    z-index: 1000;
  }

  .slogan-home > div {
    line-height: 1.8rem;
  }

  .slogan-home > p {
    line-height: 1.8rem;
  }

  .accueil-titre {
    position: relative;
    color: #7b458b;
  }

  .accueil-des {
    width: 110px;
    position: absolute;
    top: -2px;
    right: -120px;
  }
</style>
