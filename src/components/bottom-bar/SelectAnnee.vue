<template>
  <div style="width: 98px; margin-top: -6px; text-transform: uppercase;">
    <v-select
        v-model="selected"
        :items="items"
        dense
        dark
        height="28px"
        class="select-annee"
        style="font-size: 13px; font-weight: 500;"
        hide-details
        @change="onChange"
    ></v-select>
  </div>
</template>
s
<script>
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "SelectAnnee",
    data() {
      return {
        items: [
          {text: "Année 1", value: 0},
          {text: "Année 2", value: 1},
        ],
        selected: 0,
      };
    },
    computed: {
      ...mapState(["annulerChangementAnnee", "anneeAffichee"]),
      annulation() {
        return this.annulerChangementAnnee;
      },
    },
    watch: {
      annulation() {
        if (this.annulerChangementAnnee) {
          this.selected = 0;
          this.mState({prop: "annulerChangementAnnee", vl: false});
        }
      },
    },
    created() {
      this.selected = this.anneeAffichee;
    },
    methods: {
      ...mapMutations(["mState", "mJoueur"]),
      onChange() {
        if (this.$store.state.annee === 0) {
          this.mState({prop: "dialogAnnee", vl: true});
        } else {
          if (this.$store.state.anneeAffichee === 1) {
            this.mState({prop: "anneeAffichee", vl: 0});
          }
          //
          else {
            this.mState({prop: "anneeAffichee", vl: 1});
          }
        }
      },
    },
  };
</script>
