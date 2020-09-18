<template>
  <div>
    <h1 class="mb-5">Définition CCA</h1>
    <youtube video-id="YcBGTu-XnRw"/>
    <div class="mt-5 title font-weight-medium">Question</div>
    <p>Qui peut prêter de l'argent à une société ?</p>
    <v-radio-group v-model="reponse" hide-details row dense class="ma-0 pa-0 ml-1">
      <v-radio label="Un particulie" value="Un particulie"></v-radio>
      <v-radio label="Une société" value="Une société"></v-radio>
      <v-radio label="Un associé" value="Un associé"></v-radio>
      <v-radio label="Une banque" value="Une banque"></v-radio>
    </v-radio-group>
  </div>
</template>
<script>
  export default {
    name: "Video-2",
    data() {
      return {
        reponse: null,
      }
    }
  }
</script>