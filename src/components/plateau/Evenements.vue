<template>
  <div class="evenements pa-5" style="color: rgba(0,0,0,0.8)" :style="{background: evtsParcours[_posJoueur].background}">
    <div class="title"
         style="line-height: 24px"
    >{{ titreEvt }}
    </div>
    <div class="body-2 mt-5">
      <div class="mb-2 evt-main-text" v-html="mainText"></div>
      <div class="font-weight-medium">{{ valeur }}</div>
      <div>{{ compte }}</div>
    </div>
    <div class="evenements-phase subtitle-1 pa-2 font-weight-bold">
      {{ phase }}
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";

  export default {
    name: "Evenements",
    computed: {
      ...mapState(["$clrTexte", "$clrActifOn", "numJoueur", "evtsParcours"]),
      ...mapGetters(["_posJoueur"]),
      titreEvt() {
        return this.$store.state.evtsParcours[this._posJoueur].title;
      },
      mainText() {
        return this.$store.state.evtsParcours[this._posJoueur].mainText;
      },
      valeur() {
        return this.$store.state.evtsParcours[this._posJoueur].valeur;
      },
      compte() {
        return this.$store.state.evtsParcours[this._posJoueur].cpt;
      },
      phase() {
        return this.$store.state.evtsParcours[this._posJoueur].phase;
      }
    }
  }
</script>

<style>
  .evt-main-text {
    line-height: 19px !important;
  }
  .evt-main-text > p {
    margin-bottom: 10px !important;
  }
  .evenements {
    position: relative;
    width: 450px;
    /*height: 300px;*/
    border-radius: 6px;
  }
  .evenements-phase {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>