<template>
  <div class="quiz">
    <v-container class="_100vh">
      <div>
        <logo-fep/>
      </div>
      <h2 class="mt-10 mb-10 text-center">Rechargement de vos données</h2>
      <div class="text-center">
        <v-progress-circular
            :size="50"
            :width="2"
            color="purple lighten-2"
            indeterminate
        ></v-progress-circular>
      </div>
    </v-container>
  </div>
</template>

<script>
  import LogoFep from "../components/misc/LogoFep";
  export default {
    name: "ReloadData",
    components: {LogoFep}
  }
</script>
