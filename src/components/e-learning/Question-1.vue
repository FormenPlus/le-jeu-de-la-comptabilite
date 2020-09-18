<template>
  <div class="question-elearning mt-10">
    <h1 class="mb-5">Question :</h1>
    <p>Disposant d'un capital et d'un apport en compte courant associé, je vais gérer mon entreprise, prendre les décisions de produire, vendre ou investir.</p>
    <p>Avez-vous compris cette phase ?</p>
    <v-radio-group style="width: 300px" v-model="reponse" hide-details row dense class="ma-0 pa-0 ml-1">
      <v-radio label="Oui" value="Oui"></v-radio>
      <v-radio label="Non" value="Non"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: "Question-1",
    data() {
      return {
        reponse: null,
      }
    }
  }
</script>