<template>
    <button @click="randomNote">randomNote</button>
</template>

<script>
  import {getTime} from "../js/utilities";

  export default {
    name: "VirtualKeyboard",
    methods: {
      randomNote() {
        let note = {
          pitch: Math.floor(Math.random() * 60 + 30),
          playTime: getTime(),
          velocity: Math.floor(Math.random() * 100 + 1),
          channel: 1,
        };
        this.$store.commit('newNote', note)
      }
    }
  }
</script>

<style scoped>

</style>