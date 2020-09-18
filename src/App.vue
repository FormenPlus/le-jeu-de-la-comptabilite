<template>
  <v-app>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>

<!--    <Assistant v-show="$route.name === 'Plateau' || $route.name === 'Journaux'"/>-->

    <DialogChangementAnnee />

    <BottomBarActions v-if="this.isInit" />
    <BottomBarAccueil v-else />
    <!--<v-navigation-drawer v-model="offCanvasElearning"
                         disable-route-watcher
                         absolute
                         temporary
                         width="75%">
      <v-container>
        <div class="text-right"><v-btn class="red&#45;&#45;text" small text @click.stop="showElearning">Fermer</v-btn></div>
        <keep-alive>
          <component :is="myComponent[compteur]"></component>
        </keep-alive>
        <v-divider class="mt-4 mb-4"></v-divider>
        <div class="d-flex justify-space-between">
          <v-btn v-show="compteur !== 0" @click="recule">Précédant</v-btn>
          <span>&nbsp;</span>
          <v-btn v-show="compteur !== 6" @click="avance">Suivant</v-btn>
        </div>
      </v-container>
    </v-navigation-drawer>-->
  </v-app>
</template>

<script>
  import {mapState} from "vuex";
  import BottomBarActions from "./components/bottom-bar/BottomBarActions";
  import BottomBarAccueil from "./components/bottom-bar/BottomBarAccueil";
  import DialogChangementAnnee from "./components/bottom-bar/DialogChangementAnnee";

  import Assistant from "./components/e-learning/Assistant";

  import ElearningPlan from "./components/e-learning/ElearningPlan";
  import Video1 from "./components/e-learning/Video-1";
  import Video2 from "./components/e-learning/Video-2";
  import Video3 from "./components/e-learning/Video-3";
  import Video4 from "./components/e-learning/Video-4";
  import Video5_1 from "./components/e-learning/Video-5-1";
  import Video5_2 from "./components/e-learning/Video-5-2";
  export default {
    name: "App",
    data() {
      return {
        compteur: 0,
        myComponent: ["ElearningPlan", "Video1", "Video2", "Video3", "Video4", "Video5_1", "Video5_2"]
      }
    },
    components: {
      BottomBarActions,
      BottomBarAccueil,
      DialogChangementAnnee,
      Assistant,
      ElearningPlan,
      Video1,
      Video2,
      Video3,
      Video4,
      Video5_1,
      Video5_2
    },
    methods: {
      showElearning() {
        this.$store.commit("mState", {prop: "offCanvasElearning", vl: !this.offCanvasElearning});
      },
      avance() {
        this.compteur ++;
      },
      recule() {
        if (this.compteur !== 0) {
          this.compteur --;
        }
      }
    },
    computed: {
      ...mapState(["isInit", "offCanvasElearning"])
    }
  };
</script>

<style>
  ._100vh {
    height: calc(100vh - 48px);
    overflow: auto;
  }

  .logo-fep svg {
    height: 67px;
    width: 120px;
  }

  .accueil .logo-fep svg {
    width: 100px;
    height: 60px;
  }

  .usn {
    user-select: none;
  }

  iframe {
    height: 300px;
  }

  .bottom-bar {
    height: 48px;
    align-items: center;
    display: flex;
    padding: 0 10px;
    background: #273492;
  }

  .plateau .logo-fep svg {
    display: inline-block;
    position: absolute;
    bottom: 8px;
    width: 40px;
    height: 24px;
  }

  .violet--text {
    color: #7b458b !important;
  }

  .orange--text {
    color: #f39200 !important;
  }

  .orange--text-darken {
    color: #ea6d00 !important;
  }

  /*** TRANSITIONS ***/
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  /*** TRANSITIONS ***/
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-out;
  }

  .fade-leave-to {
    opacity: 0;
  }

  /*** TRANSITIONS ***/
  .v-data-table
  /deep/
  tbody
  /deep/
  tr:hover:not(.v-data-table__expanded__content) {
    background: #ffffff !important;
  }

  /*** CUSTOM-LOADER ***/

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
