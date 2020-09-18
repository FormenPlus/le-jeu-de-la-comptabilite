<template>
  <div class="form-formateur">
    <h2 class="mt-5 mb-5">Créez le code de la formation</h2>
    <div>Ce code doit être composé de <b>3 caractères minuscules.</b><br>
    Vous pouvez utiliser le même code pour toutes vos formations.</div>
    <v-form @submit.prevent="enregistrerLeCode" ref="formateur" v-model="validation">
      <v-text-field
          v-model="codeFormateur"
          :rules="codeRules"
          prepend-icon="mdi-settings"
          label="Votre code formateur"
          type="text"
          class="mb-10 mt-5 shrink mr-auto ml-auto"
      >
      </v-text-field>
      <v-btn class="mr-5" type="submit" color="warning" :disabled="!validation">Enregistrer</v-btn>
      <v-btn class="ml-5" text @click="annuler">Annuler</v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: "FormFormateur",
    data() {
      return {
        codeFormateur: "",
        codeRules: [
          value => !!value || "Votre code est demandé.",
          value => value.length === 3 || "Votre code doit contenir exactement 3 caractères.",
          value => /^[a-z]+$/.test(value) || "Votre code ne doit contenir que des caractères minuscules sans accent."
        ],
        validation: null
      }
    },
    methods: {
      enregistrerLeCode() {
        this.$store.commit("enregistreLeCodeFormation", this.codeFormateur);
      },
      annuler() {
        this.$store.commit("annulerLeRole");
      }
    }
  }
</script>

<style>
.shrink {
  width: 300px;
}
</style>
