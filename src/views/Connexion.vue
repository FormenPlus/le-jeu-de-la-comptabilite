<template>
  <div class="connexion">
    <v-container class="_100vh">
      <logo-fep/>
      <v-row no-gutters>
        <v-col md="6" offset-md="2">
          <h2 class="font-weight-regular mt-5 mb-5">Connexion</h2>
          <v-form
              @submit.prevent="submitConnexion"
              v-model="formValid"
              ref="formConnexion"
          >
            <v-text-field
                v-model="inputEmail"
                :rules="emailRules"
                :disabled="submitDisabled"
                color="#f39200"
                label="Votre email"
                type="email"
                dense
            />
            <v-text-field
                v-model="inputPassWord"
                :rules="passwordRules"
                :disabled="submitDisabled"
                label="Votre mot de passe"
                color="#f39200"
                type="password"
                dense
                class="mt-5 mb-5"
            />
            <p v-show="feedbackError" class="red--text text--darken-2 body-2 font-weight-medium">{{ feedbackMsg }}</p>

            <v-btn type="submit" :loading="hasBtnLoaderIcon" :disabled="!formValid" color="warning">
              Connexion
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon dark>cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import slugify from "slugify";
import firebase from "firebase";
import db from "../firebase/init";
import {mapMutations} from "vuex";
import LogoFep from "../components/misc/LogoFep";

export default {
  name: "Connexion",
  components: {LogoFep},
  data() {
    return {
      hasBtnLoaderIcon: false,
      inputEmail: "",
      inputPassWord: "",
      formValid: false,
      submitDisabled: false,
      feedbackError: false,
      feedbackMsg: "",
      collectionDuRole: "users",
      passwordRules: [
        value => !!value || "Un mot de passe est demandé.",
        value => value.length >= 6 || "6 caractères minimum."
      ],
      emailRules: [
        value => !!value || "Votre email est demandé."
      ]
    }
  },
  methods: {
    ...mapMutations(["mInitVisiteur", "mCacherLesAutresPions", "mLogin", "mState"]),

    async submitConnexion() {

      if (!this.formValid) return;

      this.hasBtnLoaderIcon = true;

      // Connexion.
      const loginUser = await this.$store.dispatch("signIn", {
        email: this.inputEmail,
        password: this.inputPassWord
      });

      // Si la connexion à réussie.
      if (loginUser) {

        const slugID = slugify(this.inputEmail, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        });

        // Cherche les informations de l'utilisateur.
        const refUser = await this.$store.dispatch("fetchUser", {slugID: slugID, collection: "users"});

        if (refUser) {

          localStorage.setItem("slugID", refUser.slugID);
          localStorage.setItem("role", refUser.role);

          this.mState({prop: "slugID", vl: refUser.slugID});

          // Un isAdmin peut avoir un rôle de simple visiteur
          // si il ne participe pas à la formation.
          if (refUser.isAdmin && refUser.role === "visiteur") {
            this.mInitVisiteur(refUser)
            this.mCacherLesAutresPions();
            this.mState({prop: 'isAdmin', vl: true});
            this.mLogin();
            this.hasBtnLoaderIcon = false;
            this.$router.push({name: "DashboardFormateur"});
          }
          //
          else if (refUser.role === "participant") {

            this.$store.commit("mConfigurerLeParticipant", refUser);

            setTimeout(() => {
              this.mCacherLesAutresPions();
              this.mLogin();
              this.hasBtnLoaderIcon = false;
              if (refUser.isAdmin) {
                this.$router.push({name: "DashboardFormateur"});
              } else {
                this.$router.push({name: "Plateau"});
              }
            }, 4000);
          }
        }
        // Si la connexion echoue.
        else {
          this.resetForm();
          this.feedbackMsg = "Votre email et/ou votre mot de passe sont incorrectes."
          this.feedbackError = true;
        }
      }
      // Si la connexion échoue.
      else {
        this.resetForm();
        this.feedbackMsg = "La connexion a échouée : votre email et/ou votre mot de passe sont incorrectes."
        this.feedbackError = true;
      }

    },
    resetForm() {
      this.$refs.formConnexion.reset();
      this.inputEmail = "";
      this.inputPassWord = "";
      this.hasBtnLoaderIcon = false;
    }
  }
}
</script>
