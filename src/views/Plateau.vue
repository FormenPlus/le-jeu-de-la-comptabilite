<template>
  <div class="plateau-container d-flex">
    <div class="steps-col-left">
      <Step :numStep="27" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgNeutre" :txt="evtsParcours[27].title"/>
      <Step :numStep="28" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[28].title"/>
      <Step :numStep="29" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[29].title"/>
      <Step :numStep="30" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[30].title"/>
      <Step :numStep="31" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[31].title"/>
      <Step :numStep="32" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[32].title"/>
      <Step :numStep="33" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[33].title"/>
      <Step :numStep="34" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[34].title"/>
      <Step :numStep="35" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[35].title"/>
      <Step :numStep="0" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[0].title"/>
    </div>
    <div class="steps-col-center">
      <div class="d-flex steps-row-up">
        <Step :numStep="26" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[26].title"/>
        <Step :numStep="25" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[25].title"/>
        <Step :numStep="24" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[24].title"/>
        <Step :numStep="23" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[23].title"/>
        <Step :numStep="22" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[22].title"/>
        <Step :numStep="21" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[21].title"/>
        <Step :numStep="20" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[20].title"/>
        <Step :numStep="19" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[19].title"/>
      </div>
      <div class="plateau pt-7 pb-0 pl-7 pr-0">
        <div class="d-flex mb-7">
          <evenements />
          <RappelDesPrix />
        </div>
        <ActifsJoueur v-for="n in this.nbrJoueurs" :key="n" :num-actifs-joueur="n - 1" />
      </div>
      <div class="d-flex steps-row-down">
        <Step :numStep="1" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[1].title"/>
        <Step :numStep="2" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[2].title"/>
        <Step :numStep="3" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[3].title"/>
        <Step :numStep="4" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[4].title"/>
        <Step :numStep="5" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[5].title"/>
        <Step :numStep="6" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[6].title"/>
        <Step :numStep="7" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[7].title"/>
        <Step :numStep="8" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[8].title"/>
      </div>
    </div>
    <div class="steps-col-right">
      <Step :numStep="18" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgProd" :txt="evtsParcours[18].title"/>
      <Step :numStep="17" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[17].title"/>
      <Step :numStep="16" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[16].title"/>
      <Step :numStep="15" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[15].title"/>
      <Step :numStep="14" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[14].title"/>
      <Step :numStep="13" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[13].title"/>
      <Step :numStep="12" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[12].title"/>
      <Step :numStep="11" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[11].title"/>
      <Step :numStep="10" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgVente" :txt="evtsParcours[10].title"/>
      <Step :numStep="9" :numJoueur="numJoueur" :pos="posJoueurs" :myStyle="bgNeutre" :txt="evtsParcours[9].title"/>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase";
  import {mapState, mapGetters} from 'vuex';
  import Step from "../components/parcours/Step";
  import ActifsJoueur from "../components/plateau/ActifsJoueur";
  import Evenements from "../components/plateau/Evenements";
  import RappelDesPrix from "../components/plateau/RappelDesPrix";
  export default {
    name: "Plateau",
    components: {
      Step,
      ActifsJoueur,
      Evenements,
      RappelDesPrix
    },
    data() {
      return {
        bgVente: {backgroundColor: "#FFEECE"},
        bgNeutre: {backgroundColor: "#8F9BD2"},
        bgProd: {backgroundColor: "#D1D4E8"}
      }
    },
    computed: {
      ...mapState(["numJoueur", "$clrTexte", "$clrActifOn", "nbrJoueurs", "evtsParcours"]),
      ...mapGetters(["posJoueurs"]),
    }
  }
</script>

<style>
  .plateau-container {
    position: relative;
  }
  .plateau {
    height: calc(((100vh - 48px) / 10) * 8);
    overflow-y: auto;
  }

  .steps-col-center {
    width: 80%
  }

  .steps-col-left, .steps-col-right {
    width: 10%;
  }

  .step {
    position: relative;
    display: flex;
    height: calc((100vh - 48px) / 10);
    color: #000;
  }

  .steps-col-center .step {
    width: 12.5%;
  }

  .step-text {
    margin: auto;
    padding: 0 5px;
    font-family: "Roboto Condensed", Roboto, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02rem;
    line-height: 0.8rem;
    text-align: center;
    color: rgba(0,0,0,0.6);
    overflow-wrap: break-word;
    hyphens: auto;
    text-transform: uppercase;
    user-select: none;
  }

  .step {
    border-bottom: 2px solid #ffffff;
  }

  .bgVente {background-color: #ffeece}
  .bgNeutre {background-color: #8f9bd2}
  .bgProd {background-color: #d1d4e8}

  .steps-row-up > .step, .steps-row-down > .step:first-child {
    border-left: 2px solid #ffffff;
  }

  .steps-row-down > .step, .steps-row-up > .step:last-child {
    border-right: 2px solid #ffffff;
  }

  .pion {
    position: absolute;
    width: 26px;
    height: 26px;
    text-align: center;
    border-radius: 50%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    z-index: 2;
  }

  .pion i {
    padding: 0;
    margin: 2px 0 0 2px;
  }

  .pion0 {
    top: 3px;
    left: 3px;
    background: #44A044;
  }

  .pion1 {
    top: 3px;
    right: 4px;
    background: #FFA000;
  }

  .pion2 {
    bottom: 3px;
    left: 3px;
    background: #EC407A;
  }

  .pion3 {
    bottom: 3px;
    right: 4px;
    background: #1E88E5;
  }
</style>