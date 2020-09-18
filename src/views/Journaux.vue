<template>
  <div id="journaux" class="journaux pa-5 d-flex _100vh">
    <GrandJournal/>
    <Bilan/>
    <CompteDeResultat/>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";
  import GrandJournal from "../components/journaux/GrandJournal";
  import Bilan from "../components/journaux/Bilan";
  import CompteDeResultat from "../components/journaux/CompteDeResultat";

  export default {
    name: "Journaux",
    components: {GrandJournal, Bilan, CompteDeResultat},
    data() {
      return {
        keyJr: 1,
      };
    },
    beforeDestroy() {
      this.mState({prop: "dialogJournal", vl: false});
      this.mState({prop: "dialogBilan", vl: false});
      this.mState({prop: "dialogCr", vl: false});
      this.mState({prop: "dialogAnnee", vl: false});
    },
    methods: {
      ...mapMutations(["mState"]),
    },
  };
</script>

<style>
  /*[data-type-cpt="somme"],
    [data-type-cpt="text-somme"],
    [data-type-cpt="histo"] { background-color: #ececec;}*/

  /*[data-type-cpt="text-somme"] { background-color: #65a1ec;}*/

  [data-type-cpt="somme"],
  [data-type-cpt="text-somme"],
  [data-type-cpt="histo"] {
    min-width: 40px;
    text-align: right;
    font-family: "Roboto", sans-serif !Important;
    font-weight: 500;
  }

  .update-grd-journal [data-index="0"]:hover,
  .update-grd-journal [data-index="1"]:hover,
  .update-grd-journal [data-index="2"]:hover,
  .update-grd-journal [data-index="3"]:hover,
  .update-grd-journal [data-index="4"]:hover,
  .update-grd-journal [data-index="5"]:hover,
  [data-type-cpt="text"],
  [data-type-cpt="somme"],
  [data-type-cpt="text-somme"],
  [data-type-cpt="histo"] {
    cursor: pointer;
  }

  [data-type-cpt="text"] {
    font-style: italic;
  }

  .update-grd-journal [data-index="0"]:hover,
  .update-grd-journal [data-index="1"]:hover,
  .update-grd-journal [data-index="2"]:hover,
  .update-grd-journal [data-index="3"]:hover,
  .update-grd-journal [data-index="4"]:hover,
  .update-grd-journal [data-index="5"]:hover,
  [data-type-cpt="text"]:hover,
  [data-type-cpt="somme"]:hover,
  [data-type-cpt="text-somme"]:hover,
  [data-type-cpt="histo"]:hover {
    color: red;
    box-shadow: inset 0 0 1px 1px red;
  }

  .underline {
    text-decoration: underline;
  }

  .journal h2 {
    line-height: 28px;
  }

  .journaux > div + div {
    margin-left: 20px;
  }

  .journal td {
    border-right: 1px solid rgba(0, 0, 0, 0.3) !important;
    padding: 1px 2px;
    user-select: none;
    font-family: "Roboto Condensed", Roboto, sans-serif;
    font-size: 13.5px;
  }

  .journal tr > td:first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.3) !important;
  }

  .journal table {
    border-top: 1px solid rgba(0, 0, 0, 0.3) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  }

  .journal.grand-journal table {
    border-top: none !important;
  }

  .icon-edit {
    position: absolute !important;
    top: -5px;
    left: -5px;
    user-select: none;
  }

  /*--------------------*/
  .grand-journal tbody tr:first-child > td {
    border-top: 1px solid #0000004d !important;
  }

  .gj-w-cpt {
    width: 32px;
  }

  .gj-w-libelle {
    width: 140px;
    max-width: 140px;
  }

  .gj-w-somme {
    width: 54px !important;
    max-width: 54px !important;
  }

  .gj-libelle {
    width: 140px;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow-ellipsis: "---";
    cursor: help;
  }

  .gj-somme {
    text-align: right;
  }

  /*--------------------*/
  /*.cr .tbodyCpts td:first-child,
    .cr .tbodyCpts td:nth-child(3),
    .bilan .tbodyCpts td:first-child,
    .bilan .tbodyCpts td:nth-child(5) {
      !*max-width: 120px;*!
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }*/
  /*--------------------*/
  .bt-1 {
    border-top: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bb-1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bl-1 {
    border-left: 1px solid rgba(0, 0, 0, 0.8) !important;
  }

  .bt-thin {
    border-top: 1px solid #0000004d !important;
  }

  .bb-thin {
    border-bottom: 1px solid #0000004d !important;
  }

  .bl-thin {
    border-left: 1px solid #0000004d !important;
  }

  .br-thin {
    border-right: 1px solid #0000004d !important;
  }

  .bt-none {
    border-top: none !important;
  }

  .bl-none {
    border-left: none !important;
  }
</style>
