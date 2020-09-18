<template>
  <svg class="atelier" :class="{ cursor: numJoueur === numActifsJoueur }" xmlns="http://www.w3.org/2000/svg" :id="dataImmo" width="24" height="24"
       enable-background="new -577 323 24 24" viewBox="0 0 24 24"
       :data-immo="dataImmo"
       :style="joueurs[myProp][numActifsJoueur] ? bgon : bgoff"
       @mouseover="onMouseOver"
       @mouseleave="onMouseLeave"
       @click="onClickAtelier"
  >
    <path :data-immo="dataImmo" d="m23 8.792v14.208h-22v-22h6.875v7.333l7.588-2.698zm-9.778 3.819h-3.667v3.666h3.667zm7.334 0h-3.667v3.666h3.667z"/>
  </svg>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";
  export default {
    props: ["myProp", "numActifsJoueur", "dataImmo"],
    data() {
      return {
        hasAtelier: false,
        bgon: {
          fill: this.$store.state.$clrActifOn[this.numActifsJoueur]
        },
        bgoff: {
          fill: this.$store.state.$clrActifOff[this.numActifsJoueur]
        }
      }
    },
    created() {
      this.hasAtelier = this.joueurs[this.myProp][this.numActifsJoueur];
    },
    computed: {
      ...mapState(["numJoueur", "joueurs", "$clrActifOn", "$clrActifOff"])
    },
    methods: {
      ...mapMutations(["mJoueur"]),
      ...mapActions(["actionJoueur"]),
      onClickAtelier(evt) {
        if (this.numJoueur !== this.numActifsJoueur) return;

        if (evt.target.getAttribute("data-immo")) {
          let dataAction = {
            numPlateau: this.$store.state.numPlateau,
            numJoueur: this.numJoueur,
            type: "joueurs",
            prop: this.myProp,
            vl: !this.hasAtelier,
            typeOperation: "="
          }
          this.hasAtelier = !this.hasAtelier;

          this.mJoueur({prop: this.myProp, vl: this.hasAtelier, typeOperation: "=", numJoueur:this.numActifsJoueur});
          this.actionJoueur(dataAction);
        }
      },
      onMouseOver() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasAtelier) {
          this.mJoueur({prop: this.myProp, vl: true, typeOperation: "=", numJoueur: this.numActifsJoueur});
        }
      },
      onMouseLeave() {
        if (this.numJoueur !== this.numActifsJoueur) return;
        if (!this.hasAtelier) {
          this.mJoueur({prop: this.myProp, vl: false, typeOperation: "=", numJoueur: this.numActifsJoueur});
        }
      }
    }
  }
</script>