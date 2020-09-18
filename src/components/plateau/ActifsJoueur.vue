<template>
  <div class="actifs-joueur d-inline-block mr-8">
    <h4 class="text-center font-weight-medium mb-2 usn" :style="{color: $clrTexte[numActifsJoueur]}">{{ prenoms[numActifsJoueur] }} {{ noms[numActifsJoueur] }}</h4>
    <div class="d-flex">
      <div>
        <div class="d-flex" @click="onClickTerrain">
          <div class="mr-4">
            <div
                class="d-inline-block terrain grand"
                :class="{ cursor: numJoueur === numActifsJoueur }"
                data-immo="gt"
                :style="joueurs.hasGrdT[numActifsJoueur] ? bgTrOn : bgTrOff"
                @mouseover="onOverGrdT"
                @mouseleave="onLeaveGrdT"
            ></div>
            <div>
              <atelier-joueur
                  data-immo="gtAt0"
                  my-prop="hasGrdtAt0"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
              <atelier-joueur
                  data-immo="gtAt1"
                  my-prop="hasGrdtAt1"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
              <atelier-joueur
                  data-immo="gtAt2"
                  my-prop="hasGrdtAt2"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
              <atelier-joueur
                  data-immo="gtAt3"
                  my-prop="hasGrdtAt3"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
              <atelier-joueur
                  data-immo="gtAt4"
                  my-prop="hasGrdtAt4"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
            </div>
          </div>
          <div>
            <div
                class="d-inline-block terrain petit"
                :class="{ cursor: numJoueur === numActifsJoueur }"
                data-immo="ptt"
                :style="joueurs.hasPtT[numActifsJoueur] ? bgTrOn : bgTrOff"
                @mouseover="onOverPtT"
                @mouseleave="onLeavePtT"
            ></div>
            <div>
              <atelier-joueur
                  data-immo="pttAt0"
                  my-prop="hasPttAt0"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
              <atelier-joueur
                  data-immo="pttAt1"
                  my-prop="hasPttAt1"
                  :num-actifs-joueur="numActifsJoueur"
              ></atelier-joueur>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <table class="body-2 usn">
        <tr class="font-weight-medium">
          <td :style="{color: $clrTexte[numActifsJoueur]}">Stock</td>
          <td class="text-right" style="width: 74px">
            {{ _jr("stock", numActifsJoueur) }}
          </td>
          <td>
            <v-btn v-show="numJoueur === numActifsJoueur" fab x-small depressed @click="setStock(1)">
              <v-icon>control_point</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn v-show="numJoueur === numActifsJoueur" fab x-small depressed @click="setStock(-1)" :disabled="_jr('stock', numActifsJoueur) === 0">
              <v-icon>remove_circle_outline</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr class="font-weight-medium">
          <td :style="{color: $clrTexte[numActifsJoueur]}"><b>Banque</b></td>
          <td class="text-right">
            {{ _jr("tresorerie", numActifsJoueur) }}
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

  import imgBgTerrain from "../../assets/terrain.svg";
  import AtelierJoueur from "./Atelier";

  export default {
    name: "ActifsJoueur",
    props: ["numActifsJoueur"],
    components: {
      AtelierJoueur,
    },
    data() {
      return {
        bgTrOn: {
          backgroundColor: this.$store.state.$clrActifOn[this.numActifsJoueur],
          backgroundImage: `url(${imgBgTerrain})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "7px 0",
        },
        bgTrOff: { backgroundColor: this.$store.state.$clrActifOff[this.numActifsJoueur] },

        hasGrdT: false,
        hasPtT: false
      };
    },
    created() {
      this.hasGrdT = this.joueurs.hasGrdT[this.numActifsJoueur];
      this.hasPtT = this.joueurs.hasPtT[this.numActifsJoueur];
    },
    computed: {
      ...mapState(["numPlateau", "numJoueur", "joueurs", "$clrTexte", "noms", "prenoms"]),
      ...mapGetters(["_jr"]),
    },
    methods: {
      ...mapMutations(["mJoueur"]),
      ...mapActions(["actionJoueur"]),
      onClickTerrain(evt) {
        if (this.numJoueur !== this.numActifsJoueur) return;

        if (evt.target.getAttribute("data-immo")) {
          const immo = evt.target.getAttribute("data-immo");

          let dataAction = {
            numPlateau: this.$store.state.numPlateau,
            numJoueur: this.numJoueur,
            type: "joueurs",
            prop: null,
            vl: null,
            typeOperation: "="
          }

          switch (immo) {
            case "gt":
              dataAction.prop = "hasGrdT";
              dataAction.vl = !this.hasGrdT;
              this.mJoueur({prop: "hasGrdT", vl: !this.hasGrdT, typeOperation: "=", numJoueur:this.numActifsJoueur});
              this.hasGrdT = !this.hasGrdT;
              break;
            case "ptt":
              dataAction.prop = "hasPtT";
              dataAction.vl = !this.hasPtT;
              this.mJoueur({prop: "hasPtT", vl: !this.hasPtT, typeOperation: "=", numJoueur:this.numActifsJoueur});
              this.hasPtT = !this.hasPtT;
              break;
          }

          this.actionJoueur(dataAction);
        }
      },

      setStock(n) {
        if (this.numJoueur !== this.numActifsJoueur) return;
        this.actionJoueur({
          numPlateau: this.numPlateau,
          numJoueur: this.numJoueur,
          type: "joueurs",
          prop: "stock",
          vl: n,
          typeOperation: "+"
        });
      },
      
      onOverGrdT() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasGrdT) {
          this.mJoueur({prop: "hasGrdT", vl: true, typeOperation: "=", numJoueur:this.numActifsJoueur});
        }
      },
      onLeaveGrdT() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasGrdT) {
          this.mJoueur({prop: "hasGrdT", vl: false, typeOperation: "=", numJoueur:this.numActifsJoueur});
        }
      },
      // Petit terrain
      onOverPtT() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasPtT) {
          this.mJoueur({prop: "hasPtT", vl: true, typeOperation: "=", numJoueur:this.numActifsJoueur});
        }
      },
      onLeavePtT() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasPtT) {
          this.mJoueur({prop: "hasPtT", vl: false, typeOperation: "=", numJoueur:this.numActifsJoueur});
        }
      }
    }
  };
</script>

<style scoped>
  .cursor {
    cursor: pointer
  }
  .terrain {
    height: 28px;
    border-radius: 3px;
  }
  .grand {
    width: 120px;
  }
  .petit {
    width: 56px;
  }
  .atelier + .atelier {
    margin-left: 5px;
  }

  .atelier {
    width: 20px;
    height: 20px;
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes shake {
    0%,
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
  }
  @keyframes shake {
    0%,
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
  }
</style>
