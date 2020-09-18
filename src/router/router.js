import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import store from "../store/store";
import Accueil from "../views/Accueil.vue";
import Connexion from "../views/Connexion.vue";
import InscriptionParticipant from "../views/InscriptionParticipant.vue";
import DashboardFormateur from "../views/DashboardFormateur.vue";
import Plateau from "../views/Plateau.vue";
import Journaux from "../views/Journaux.vue";
import Quiz from "../views/Quiz.vue";
import ReloadData from "../views/ReloadData.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/reload-data",
    name: "ReloadData",
    component: ReloadData,
  },
  {
    path: "/inscription-participant",
    name: "InscriptionParticipant",
    component: InscriptionParticipant,
  },
  {
    path: "/dashboard-formateur",
    name: "DashboardFormateur",
    component: DashboardFormateur,
    meta: {
      requiresFormateur: true
    }
  },
  {
    path: "/plateau",
    name: "Plateau",
    component: Plateau,
    meta: {
      requiresAuthOrVisitor: true
    }
  },
  {
    path: "/journaux",
    name: "Journaux",
    component: Journaux,
    meta: {
      requiresAuthOrVisitor: true
    }
  },
  {
    path: "quiz",
    name: "Quiz",
    component: Quiz
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(rec => rec.meta.requiresAuthOrVisitor)) {
    // Vérifie si l'utilisateur est authentifé.
    const user = firebase.auth().currentUser

    if (user || store.state.role === "visiteur") {
      next();
    } else {
      // Redirige vers l'écran d'accueil pour
      // l'inscription ou la connexion.
      next({
        name: "Accueil"
      });
    }
  }
  // Vérifie si la route requière une authentification.
  else if (to.matched.some(rec => rec.meta.requiresAuth)) {
    const user = firebase.auth().currentUser
    if (user) {
      next();
    } else {
      next({
        name: "Accueil"
      });
    }
  } else {
    next();
  }
});

export default router;
