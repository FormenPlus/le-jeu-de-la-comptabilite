<template>
  <div>
    <h1 class="mb-5">Présentation</h1>
    <youtube video-id="pshAZNNZT7c"/>
    <div class="mt-5 title font-weight-medium">Question</div>
    <p class="body-2">Disposant d'un capital et d'un apport en compte courant associé, je vais gérer mon entreprise, prendre les décisions de produire, vendre ou investir.</p>
    <p>Avez-vous compris cette phase ?</p>
    <v-radio-group v-model="reponse" hide-details row dense class="ma-0 pa-0 ml-1">
      <v-radio label="Oui" value="Oui"></v-radio>
      <v-radio label="Non" value="Non"></v-radio>
    </v-radio-group>
  </div>
</template>
<script>
  export default {
    name: "Video-1",
    data() {
      return {
        reponse: null,
      }
    }
  }
</script>