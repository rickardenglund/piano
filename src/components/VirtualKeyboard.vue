<template>
    <div id="keyboard">
        <button @click="randomNote">randomNote</button>
        <button :key="i" v-for="i in 13" @click="play(i + 59)">{{i + 59}} : {{noteName(i+59)}}</button>
    </div>
</template>

<script>
  import {getNoteName, getTime} from "../js/utilities";

  export default {
    name: "VirtualKeyboard",
    methods: {
      noteName(i) {
        return getNoteName(i);
      },
      play(i) {
        let note = {
          pitch: i,
          playTime: getTime(),
          velocity: Math.floor(Math.random() * 100 + 1),
          channel: 1,
        };
        this.$store.commit('newNote', note)
      },
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
#keyboard {
    background-color: rebeccapurple;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 10;
}

    #keyboard > button {
        height: 50px;
    }
</style>