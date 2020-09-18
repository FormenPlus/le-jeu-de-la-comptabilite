<template>
  <div class="validation-plateaux">
    <v-container class="_100vh">
      <v-row class="align-center mb-8">
        <logo-fep/>
        <v-spacer></v-spacer>
        <v-icon x-large color="grey darken-3">dashboard</v-icon>
        <div class="display-1 ml-2 grey--text text--darken-3">Dashboard Formateur</div>
      </v-row>
      <v-row class="mt-10 mb-10">
        <v-col class="col-4">
          <ListeCodesFormation/>
        </v-col>
        <v-col class="col-4">
          <CodeFormation/>
        </v-col>
        <!--<v-col class="col-4">
          <h4 class="font-weight-regular mb-4">Remise à zéro des données *</h4>
          <v-btn class="font-weight-bold" dark small color="red" :loading="hasBtnLoaderIcon" @keyup.enter="signOutRaz"
                 @click="signOutRaz">
            Remise à zéro
            <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon dark>cached</v-icon>
                </span>
            </template>
          </v-btn>
          <p class="caption mt-2">* <em>La remise à zéro renvoie à l'accueil.</em></p>
        </v-col>-->
      </v-row>
      <repartition-joueurs v-if="$store.state.voirLaRepartition" />
      <div class="text-center mt-5" v-if="$store.state.voirLaRepartition">
        <v-btn small @click="validerLesPlateaux" class="ml-5 mr-5 white--text" color="#F39200">
          <v-icon left dark>save_alt</v-icon>
          Valider les plateaux
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
  import firebase from "firebase";
  import db from "../firebase/init";
  import {mapState} from "vuex";
  import LogoFep from "../components/misc/LogoFep";
  import CodeFormation from "../components/dashboard/CodeFormation";
  import ListeCodesFormation from "../components/dashboard/ListeCodesFormation";
  import RepartitionJoueurs from "../components/repartion-joueurs/RepartitionJoueurs";

  export default {
    name: "DashboardFormateur",
    components: {LogoFep, CodeFormation, ListeCodesFormation, RepartitionJoueurs},
    data() {
      return {
        hasBtnLoaderIcon: false
      }
    },
    created() {
      console.log("DashboardFormateur");
    },
    computed: {
      ...mapState(["codeFormation"])
    },
    methods: {
      validerLesPlateaux() {
        db.collection("init_formateur").add({
          startFormation: true,
          codeFormation: this.codeFormation
        }).then(validation => {
          setTimeout(() => {
            db.collection("init_formateur")
                .doc(validation.id)
                .delete()
                .then(() => {
                  db.collection("codes_formations")
                      .doc(this.$store.state.codeFormation)
                      .update({done: true});
                });
          }, 5000);

        });
      },
      /*async signOutRaz() {
        this.hasBtnLoaderIcon = true;
        const signOut = await this.$store.dispatch("signOut");
        if (signOut) {
          this.hasBtnLoaderIcon = false;
          this.$router.push({name: "Accueil"});
        }
      }*/
    }
  }
</script>
