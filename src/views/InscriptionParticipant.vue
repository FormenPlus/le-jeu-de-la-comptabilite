<template>
  <div class="inscription-participant" style="position: relative">
    <v-container class="_100vh">
      <v-row class="align-center mb-8">
        <logo-fep/>
        <v-spacer></v-spacer>
        <v-icon x-large color="#7b458b">person_add</v-icon>
        <div class="display-1 violet--text ml-2">Inscription</div>
      </v-row>
      <v-form
          @submit.prevent="submitParticipant"
          ref="refFormParticipant"
          v-model="formValid"
      >
        <div>
          <h3 class="font-weight-regular orange--text-darken">1 - Renseignez complètement le formulaire</h3>
          <p class="caption red--text text--darken-2 mb-0">Vos informations serviront exclusivement dans le cadre du jeu.</p>
        </div>
        <v-row>
          <v-col md="4" sm="4" class="pb-0">
            <v-text-field
                v-model="inputEmail"
                :rules="emailRules"
                :disabled="submitDisabled"
                color="#f39200"
                label="Votre email"
                type="email"
                dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" sm="4" class="pt-0 pb-0">
            <v-text-field
                v-model="inputNom"
                :rules="nomRules"
                :disabled="submitDisabled"
                label="Nom"
                color="#f39200"
                type="text"
                dense
            />
          </v-col>
          <v-col md="4" sm="4" class="pt-0 pb-0">
            <v-text-field
                v-model="inputPrenom"
                :rules="prenomRules"
                :disabled="submitDisabled"
                label="Prénom"
                color="#f39200"
                type="text"
                dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" sm="4" class="pt-0 pb-0">
            <v-text-field
                v-model="inputPassWord"
                :rules="passwordRules"
                :disabled="submitDisabled"
                label="Mot de passe"
                color="#f39200"
                type="password"
                dense
            />
          </v-col>
          <v-col md="4" sm="4" class="pt-0 pb-0">
            <v-text-field
                v-model="inputCodeFormation"
                :rules="codeRules"
                :disabled="submitDisabled"
                label="Code formation"
                color="#f39200"
                type="text"
                dense
            />
          </v-col>
        </v-row>
        <div class="mt-4">
          <h4>Sélectionnez le numéro de plateau indiqué par votre formateur</h4>
          <v-radio-group
              v-model="numPlateau"
              :rules="plateauRules"
              :disabled="submitDisabled"
              dense
              row
              class="mt-2"
          >
            <v-radio
                v-for="n in 10"
                :key="n"
                :label="`${n}`"
                :value="n"
                class="mr-7"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="mt-2">
          <v-btn type="submit" :disabled="submitDisabled || !formValid" color="warning">Enregistrer</v-btn>
          <div class="body-2 red--text text--darken-2 mt-2" v-show="errorFeedback">{{ errorFeedback }}<br> Renseignez à
            nouveau le formulaire svp.
          </div>
        </div>
      </v-form>
      <div class="mt-5 mb-2">
        <h3 class="font-weight-regular orange--text-darken">2 - Attendez que votre formateur valide les plateaux</h3>
      </div>
      <repartition-joueurs v-if="$store.state.voirLaRepartition" />
    </v-container>
  </div>
</template>

<script>
  import db from "../firebase/init";
  import firebase from "firebase";
  import slugify from "slugify";
  import {mapState, mapMutations, mapActions} from "vuex";
  import LogoFep from "../components/misc/LogoFep";
  import RepartitionJoueurs from "../components/repartion-joueurs/RepartitionJoueurs";

  export default {
    name: "InscriptionParticipant",
    components: {LogoFep, RepartitionJoueurs},
    data() {
      return {
        formValid: false,
        errorFeedback: null,
        submitDisabled: false,
        textBtnAccesPlateau: "Accédez à la formation",
        inputCodeFormation: "",
        inputNom: "",
        inputPrenom: "",
        inputEmail: "",
        slugID: "",
        inputPassWord: "",
        userID: "",
        numPlateau: 0,
        codeRules: [
          value => !!value || "Le code formation est demandé."
        ],
        passwordRules: [
          value => !!value || "Un mot de passe est demandé.",
          value => value.length >= 6 || "6 caractères minimum."
        ],

        prenomRules: [
          value => !!value || "Votre prénom est demandé."
        ],
        nomRules: [
          value => !!value || "Votre nom est demandé."
        ],
        emailRules: [
          value => !!value || "Votre email est demandé.",
          value => value.indexOf("@") !== 0 || "Votre mail devrait contenir un nom.",
          value => value.includes("@") || "Votre email devrait contenir le caractère @ .",
          // TODO Revoir la règle pour les email qui contienne deux points ex. pascal.pivayu@gmail.com
          // value => value.indexOf(".") - value.indexOf("@") > 1 || "Votre email devrait contenir un nom de domaine.",
          value => value.indexOf(".") <= value.length - 3 || "Votre mail devrait contenir une extention de domaine valide (ex .com)."
        ],
        plateauRules: [
          value => !!value || "Le numéro de plateau est demandé."
        ],
      }
    },
    watch: {
      formValid() {
        if (this.formValid) {
          this.errorFeedback = null;
        }
      }
    },
    computed: {
      ...mapState(["codeFormation"])
    },
    methods: {
      ...mapMutations(["mLogin", "mState"]),
      ...mapActions(["fetchUser"]),
      submitParticipant: function () {
        this.submitDisabled = true;
        this.errorFeedback = null;
        this.verifierLeSlugID();
      },
      async verifierLeSlugID() {
        // slugID sert d'ID personnalisé dans les collections de Firebase.
        this.slugID = slugify(this.inputEmail, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });

        // Cherche si le USER existe déjà.
        const refUser = await this.fetchUser({slugID: this.slugID, collection: "users"});

        if (refUser) {
          this.errorFeedback = `${this.inputEmail} a déjà été enregistré par un autre participant !`;
          this.submitDisabled = false;
          this.$refs.refFormParticipant.reset();
          this.resetInput();
        } else {
          this.errorFeedback = null;
          await this.verifierLeCodeFormation();
        }
      },
      async verifierLeCodeFormation() {
        try {

          const refCodeFormation = await db.collection("codes_formations").doc(this.inputCodeFormation);

          refCodeFormation.get().then(doc => {

            if (doc.exists) {
              this.errorFeedback = null;
              this.enregistrerLeParticipant();
            } else {
              this.errorFeedback = `${this.inputCodeFormation} : ce code de formation n'est pas ou plus valide.`;
              this.submitDisabled = false;
              this.$refs.refFormParticipant.reset();
              this.resetInput();
            }

          })

        } catch (e) {
          console.log("Il y a un problème avec la vérification du code formation.")
        }
      },
      enregistrerLeParticipant() {
        localStorage.setItem("numPlateau", this.numPlateau);
        localStorage.setItem("slugID", this.slugID);
        localStorage.setItem("codeFormation", this.inputCodeFormation);
        localStorage.setItem("role", "participant");

        let refUser = db.collection("users").doc(this.slugID);
        refUser.get().then(() => {

          firebase
              .auth().createUserWithEmailAndPassword(this.inputEmail, this.inputPassWord)
              .then(credential => {
                const infosUser = {
                  slugID: this.slugID,
                  userID: credential.user.uid,
                  role: "participant",
                  isAdmin: false,
                  email: this.inputEmail,
                  timestamp: Date.now(), // <- Sert pour l'ordre de répartitions des joueurs par plateau.
                  nom: this.inputNom, // <- Sert que pour l'affichage dans la répartition des joueurs.
                  prenom: this.inputPrenom, // <- Sert que pour l'affichage dans la répartition des joueurs.
                  codeFormation: this.inputCodeFormation, // <- Pour filtrer
                  numPlateau: this.numPlateau, // <- Pour répartir sur les plateau er filtrer
                }

                refUser.set(infosUser);

                this.mLogin();
                this.mState({prop: "codeFormation", vl: this.inputCodeFormation});
                this.mState({prop: "voirLaRepartition", vl: true});
              })
              .then(() => {
                console.log("ok");
              })
              .catch(err => {
                console.log(err);
              })
        });
      },
      resetInput() {
        this.inputNom = "";
        this.inputPrenom = "";
        this.inputEmail = "";
        this.slugID = "";
        this.inputPassWord = "";
        this.userID = "";
      }
    }
  }
</script>
