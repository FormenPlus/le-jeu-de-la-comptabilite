<template>
  <div class="code-formation">
    <h4 class="mb-4">Créer un code formation</h4>
    <v-form
        @submit.prevent="verifierLeCodeFormation"
        ref="refFormCodeFormation"
        v-model="formValid"
    >
      <v-text-field
          v-model="inputCodeFormation"
          :rules="codeRules"
          :disabled="submitDisabled"
          label="Code formation"
          color="#f39200"
          type="text"
          dense
      />
      <!--<v-checkbox
          v-model="checkboxParticipant"
          label="Participer à la formation"
          :disabled="submitDisabled"
      ></v-checkbox>-->
      <p class="caption">Si vous participé à la formation vous serez automatiquement sur le <b>plateau 1</b>. Sinon,
        serez considéré comme simple visiteur.</p>
      <v-btn small type="submit" :disabled="submitDisabled || !formValid" color="warning" class="mt-2">Enregistrer
      </v-btn>
      <div class="body-2 red--text text--darken-2 mt-2" v-if="errorFeedback">{{ errorFeedback }}</div>
    </v-form>
  </div>
</template>

<script>
import db from "../../firebase/init";

export default {
  name: "CodeFormation",
  data() {
    return {
      formValid: false,
      inputCodeFormation: "",
      checkboxParticipant: false,
      submitDisabled: false,
      errorFeedback: null,
      codeRules: [
        value => !!value || "Le code formation est demandé."
      ],
    }
  },
  methods: {
    async verifierLeCodeFormation() {
      try {

        const refCodeFormation = await db.collection("codes_formations").doc(this.inputCodeFormation);

        refCodeFormation.get().then(doc => {

          if (doc.exists) {
            this.errorFeedback = `${this.inputCodeFormation} : Ce code formation existe déjà.`;
            this.inputCodeFormation = "";
            this.submitDisabled = false;
            this.$refs.refFormCodeFormation.reset();
          } else {
            localStorage.setItem("codeFormation", this.inputCodeFormation);
            this.enregistrerLeCode();
          }

        })

      } catch (e) {
        console.log("Il y a un problème avec la vérification du code formation dans le Dashboard Formateur.");
      }
    },
    enregistrerLeCode() {
      let ref = db.collection("codes_formations").doc(this.inputCodeFormation);
      ref.get().then(() => {
        ref.set({code: this.inputCodeFormation, done: false, timestamp: Date.now()});

        this.$store.commit("mState", {prop: "codeFormation", vl: this.inputCodeFormation});
        this.$store.commit("mState", {prop: "voirLaRepartition", vl: true});

        this.inputCodeFormation = "";
        this.errorFeedback = null;
        this.submitDisabled = false;
        this.$refs.refFormCodeFormation.reset();

        /*if (this.checkboxParticipant) {
          this.modifierLeformateur();
        } else {
          this.inputCodeFormation = "";
          this.errorFeedback = null;
          this.submitDisabled = false;
          this.$refs.refFormCodeFormation.reset();
        }*/
      })
    }
    /*modifierLeformateur() {
      localStorage.setItem("role", "participant");
      localStorage.setItem("codeFormation", this.inputCodeFormation);
      localStorage.setItem("numPlateau", "1");

      db.collection("users")
          .doc(this.$store.state.slugID)
          .update({
            codeFormation: this.inputCodeFormation,
            role: "participant",
            timestamp: Date.now()
          })
          .then(() => {
            this.inputCodeFormation = "";
            this.errorFeedback = null;
            this.submitDisabled = false;
            this.$refs.refFormCodeFormation.reset();
          })
    }*/
  }
}
</script>