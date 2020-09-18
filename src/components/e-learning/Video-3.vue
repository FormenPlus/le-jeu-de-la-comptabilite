<template>
  <div>
    <h1 class="mb-5">Explication de la question</h1>
    <youtube video-id="axO0GRChuDQ"/>
    <div class="mt-5 title font-weight-medium">Question</div>
    <p>Que représente pour vous la notion d'apport en capital social dans une entreprise ?</p>
    <v-textarea
        label="Votre réponse"
        auto-grow
        outlined
        rows="4"
        row-height="15"
        v-model="reponse"
    ></v-textarea>
  </div>
</template>
<script>
  export default {
    name: "Video-3",
    data() {
      return {
        reponse: null,
      }
    }
  }
</script>