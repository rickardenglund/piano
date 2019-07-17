<template>
    <div id="keyboard">
        <button @click="randomNote">randomNote</button>
        <button :key="i" v-for="i in 13" @click="play(i + 59)">{{i + 59}} : {{noteName(i+59)}}</button>
        <button @click="playScale()">play scale</button>
        <button @click="playScale(true)">play Double scale</button>
<!--        <button @click="playTwoOctavesScale()">Play Two Octaves Double scale</button>-->
        <button @click="playTwoOctavesScale(true)">Play Two Octaves Double scale</button>
    </div>
</template>

<script>
  import {getNoteName, getTime} from "../js/utilities";

  export default {
    name: "VirtualKeyboard",
    methods: {
      playScale(double) {
        let arr = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0];
        for (let i in arr) {
          setTimeout(() => this.setInstrument(60 + arr[i]), i * 100);
          if (double) setTimeout(() => this.setInstrument(60 + 12 + arr[i]), i * 100);
        }
      },
      playTwoOctavesScale(double) {
        let arr = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 23, 21, 19, 17, 16, 14, 12, 11, 9, 7, 5, 4, 2, 0];
        for (let i in arr) {
          setTimeout(() => this.setInstrument(60 + arr[i]), i * 100);
          if (double) setTimeout(() => this.setInstrument(60 + 12 + arr[i]), i * 100);
        }
      },
      noteName(i) {
        return getNoteName(i);
      },
      setInstrument(i) {
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