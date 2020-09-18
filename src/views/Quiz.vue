<template>
  <div class="quiz">
    <v-container class="_100vh pb-10">
      <div>
        <logo-fep/>
      </div>
      <h2 class="mb-2" :style="{color: $clrActifOn[numJoueur]}">Quiz</h2>
      <ol class="pa-0" >
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">1 - </span>{{quiz[0]}}
          <v-radio-group v-model="reponses[0]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px" @change="reponse0">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">2 - </span>{{quiz[1]}}
          <v-radio-group @change="reponse1" v-model="reponses[1]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px" >
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">3 - </span>{{quiz[2]}}
          <v-radio-group @change="reponse2" v-model="reponses[2]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">4 - </span>{{quiz[3]}}
          <v-radio-group @change="reponse3" v-model="reponses[3]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">5 - </span>{{quiz[4]}}
          <v-radio-group @change="reponse4" v-model="reponses[4]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">6 - </span>{{quiz[5]}}
          <v-radio-group @change="reponse5" v-model="reponses[5]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">7 - </span>{{quiz[6]}}
          <v-radio-group @change="reponse6" v-model="reponses[6]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">8 - </span>{{quiz[7]}}
          <v-radio-group @change="reponse7" v-model="reponses[7]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">9 - </span>{{quiz[8]}}
          <v-radio-group @change="reponse8" v-model="reponses[8]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">10 - </span>{{quiz[9]}}
          <v-radio-group @change="reponse9" v-model="reponses[9]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">11 - </span>{{quiz[10]}}
          <v-radio-group @change="reponse10" v-model="reponses[10]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">12 - </span>{{quiz[11]}}
          <v-radio-group @change="reponse11" v-model="reponses[11]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">13 - </span>{{quiz[12]}}
          <v-radio-group @change="reponse12" v-model="reponses[12]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">14 - </span>{{quiz[13]}}
          <v-radio-group @change="reponse13" v-model="reponses[13]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">15 - </span>{{quiz[14]}}
          <v-radio-group @change="reponse14" v-model="reponses[14]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">16 - </span>{{quiz[15]}}
          <v-radio-group @change="reponse15" v-model="reponses[15]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">17 - </span>{{quiz[16]}}
          <v-radio-group @change="reponse16" v-model="reponses[16]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">18 - </span>{{quiz[17]}}
          <v-radio-group @change="reponse17" v-model="reponses[17]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">19 - </span>{{quiz[18]}}
          <v-radio-group @change="reponse18" v-model="reponses[18]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">20 - </span>{{quiz[19]}}
          <v-radio-group @change="reponse19" v-model="reponses[19]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">21 - </span>{{quiz[20]}}
          <v-radio-group @change="reponse20" v-model="reponses[20]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">22 - </span>{{quiz[21]}}
          <v-radio-group @change="reponse21" v-model="reponses[21]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">23 - </span>{{quiz[22]}}
          <v-radio-group @change="reponse22" v-model="reponses[22]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">24 - </span>{{quiz[23]}}
          <v-radio-group @change="reponse23" v-model="reponses[23]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">25 - </span>{{quiz[24]}}
          <v-radio-group @change="reponse24" v-model="reponses[24]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">26 - </span>{{quiz[25]}}
          <v-radio-group @change="reponse25" v-model="reponses[25]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
        <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
          <span class="mr-2 font-weight-bold">27 - </span>{{quiz[26]}}
          <v-radio-group @change="reponse26" v-model="reponses[26]" hide-details row dense class="ma-0 pa-0 ml-1" style="width: 300px">
            <v-radio label="Vrai" value="vrai"></v-radio>
            <v-radio label="Faux" value="faux"></v-radio>
          </v-radio-group>
        </li>
      </ol>
    </v-container>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import LogoFep from "../components/misc/LogoFep";
  import QuestionQiz from "../components/misc/QuestionQiz";

  export default {
    name: "Quiz",
    components: {LogoFep, QuestionQiz},
    data() {
      return {}
    },
    computed: {
      ...mapState(["$clrActifOn", "numJoueur", "quiz", "reponses"])
    },
    methods: {
      ...mapMutations(["stateArrayMutation"]),
      reponse0(rep) { this.stateArrayMutation({prop: "reponses", index: 0, vl: rep}) },
      reponse1(rep) { this.stateArrayMutation({prop: "reponses", index: 1, vl: rep}) },
      reponse2(rep) { this.stateArrayMutation({prop: "reponses", index: 2, vl: rep}) },
      reponse3(rep) { this.stateArrayMutation({prop: "reponses", index: 3, vl: rep}) },
      reponse4(rep) { this.stateArrayMutation({prop: "reponses", index: 4, vl: rep}) },
      reponse5(rep) { this.stateArrayMutation({prop: "reponses", index: 5, vl: rep}) },
      reponse6(rep) { this.stateArrayMutation({prop: "reponses", index: 6, vl: rep}) },
      reponse7(rep) { this.stateArrayMutation({prop: "reponses", index: 7, vl: rep}) },
      reponse8(rep) { this.stateArrayMutation({prop: "reponses", index: 8, vl: rep}) },
      reponse9(rep) { this.stateArrayMutation({prop: "reponses", index: 9, vl: rep}) },
      reponse10(rep) { this.stateArrayMutation({prop: "reponses", index: 10, vl: rep}) },
      reponse11(rep) { this.stateArrayMutation({prop: "reponses", index: 11, vl: rep}) },
      reponse12(rep) { this.stateArrayMutation({prop: "reponses", index: 12, vl: rep}) },
      reponse13(rep) { this.stateArrayMutation({prop: "reponses", index: 13, vl: rep}) },
      reponse14(rep) { this.stateArrayMutation({prop: "reponses", index: 14, vl: rep}) },
      reponse15(rep) { this.stateArrayMutation({prop: "reponses", index: 15, vl: rep}) },
      reponse16(rep) { this.stateArrayMutation({prop: "reponses", index: 16, vl: rep}) },
      reponse17(rep) { this.stateArrayMutation({prop: "reponses", index: 17, vl: rep}) },
      reponse18(rep) { this.stateArrayMutation({prop: "reponses", index: 18, vl: rep}) },
      reponse19(rep) { this.stateArrayMutation({prop: "reponses", index: 19, vl: rep}) },
      reponse20(rep) { this.stateArrayMutation({prop: "reponses", index: 20, vl: rep}) },
      reponse21(rep) { this.stateArrayMutation({prop: "reponses", index: 21, vl: rep}) },
      reponse22(rep) { this.stateArrayMutation({prop: "reponses", index: 22, vl: rep}) },
      reponse23(rep) { this.stateArrayMutation({prop: "reponses", index: 23, vl: rep}) },
      reponse24(rep) { this.stateArrayMutation({prop: "reponses", index: 24, vl: rep}) },
      reponse25(rep) { this.stateArrayMutation({prop: "reponses", index: 25, vl: rep}) },
      reponse26(rep) { this.stateArrayMutation({prop: "reponses", index: 26, vl: rep}) },
    }
  }
</script>

<style scoped>
  .v-input__slot {
    margin: 0 !important;
    padding: 0 !important;
  }

  .v-messages.theme--ligh {
    height: 1px;
  }

  .v-input--selection-controls__ripple.primary--text {
    margin: 0 !important;
    padding: 0 !important;
  }

  .v-input {
    height: 20px;
  }
</style>