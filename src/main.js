import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from "vue";
import VueYoutube from 'vue-youtube'
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.use(VueYoutube);

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      created: function () {
        if (user) {
          if (this.$store.state.role === "formateur") {
            this.$store.commit("mLogin");
            this.$store.commit("mIsInit", true);
            this.$router.push({name: "DashboardFormateur"});
          }
          //
          else if (localStorage.getItem("role") === "participant") {
            this.$router.push({name: "ReloadData"});
            this.$store.dispatch("recupererLetatDuJoueurAction").then(() => {
              setTimeout(() => {
                this.$store.commit("mLogin");
                this.$store.commit("mIsInit", true);
                this.$router.push({name: "Plateau"});
              }, 3000);
            });
          }
        }
        //
        else if (this.$store.state.role === "visiteur") {

          this.$router.push({name: "Plateau"});
        }
        //
        else {
          this.$router.push({name: "Accueil"});
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});


