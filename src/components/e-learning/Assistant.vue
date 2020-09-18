<template>
  <drag-it-dude class="assistant">
    <youtube style="z-index: 1000" width="360px" video-id="pshAZNNZT7c"/>
    <div class="pa-2">
      <h3 style="z-index: 10000000">Hello World!</h3>
    </div>
    <div class="d-flex align-center pl-2 pr-2" :style="{backgroundColor: $bgBar, height: '38px'}">
      <v-spacer></v-spacer>
      <v-icon class="indigo--text text--lighten-3">open_with</v-icon>
    </div>
  </drag-it-dude>
</template>

<script>
  import {mapState} from "vuex";
  import DragItDude from 'vue-drag-it-dude';

  export default {
    name: "Assistant",
    components: {DragItDude},
    data() {
      return {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    },
    computed: {
      ...mapState(["$bgBar"])
    },
    methods: {
    }
  }
</script>

<style scoped>
  .assistant {
    background: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    z-index: 10000;
  }
  .assistant-bottom {
    background: #273492;
  }
</style>