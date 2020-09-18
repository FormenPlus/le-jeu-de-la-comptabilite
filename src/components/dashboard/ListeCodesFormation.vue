<template>
  <div class="liste-codes-formation">
    <h4 class="mb-4">Liste des 5 derniers codes formations</h4>
    <ul>
      <li v-for="(code, index) in listeCodes" :key="index">{{ code.code }} <v-icon>{{ code.done ? "done": "cog"}}</v-icon></li>
    </ul>
  </div>
</template>

<script>
  import db from "../../firebase/init";

  export default {
    name: "ListeCodesFormation",
    data() {
      return {
        listeCodes: []
      }
    },
    created() {

      // Référence la collection Firebase qu'on écoute.
      let refListe = db.collection("codes_formations").orderBy("timestamp", "desc").limit(5);

      // Le gestionnaire de la collection écoutée.
      refListe.onSnapshot(snapshot => {

        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const codeForm = change.doc.data();
            
            if (codeForm.done === false) {
              // TODO voir ce qui se passe quand on change de page sans avoir validé le nouveau code !

              // Retire le dernier code de la liste.
              this.listeCodes.pop();
              // Ajoute le nouveau code au début de la liste.
              this.listeCodes.unshift(codeForm);
            } else {
              this.listeCodes.push(codeForm);
            }

          }
          //
          else if (change.type === "modified") {

            const lng = this.listeCodes.length;
            for (let i = 0; i < lng; i++) {
              if (this.listeCodes[i].done === false) {
                this.$set(this.listeCodes[i], "done", true);
              }
            }
          }
        })

      });
    },
    methods: {
      /*listeCodesTries(arr) {
        return arr.slice().sort(function (a, b) {
          return a.timestamp + b.timestamp;
        });
      },*/
    }
  }
</script>

<style scoped>

</style>