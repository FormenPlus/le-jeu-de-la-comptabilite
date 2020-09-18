<template>
  <li class="body-2 mb-4 d-flex align-center ma-0 pa-0">
    <span class="mr-2 font-weight-bold">{{myNum + 1}}</span>{{question}}
    <v-radio-group style="width: 300px" v-model="reponse" hide-details row dense class="ma-0 pa-0 ml-1">
      <v-radio label="Vrai" value="vrai"></v-radio>
      <v-radio label="Faux" value="faux"></v-radio>
    </v-radio-group>
  </li>
</template>

<script>
  export default {
    name: "QuestionQiz",
    props: ["question", "num"],
    data() {
      return {
        reponse: null,
        myNum: this.num
      }
    }
  }
</script>