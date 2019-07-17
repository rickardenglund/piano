<template>
    <div id="keyboard">
        <button @click="randomNote">randomNote</button>
        <button :key="i" v-for="i in 13" @click="play(i + 59)">{{i + 59}} : {{noteName(i+59)}}</button>
        <button @click="playScale()">scale</button>
        <button @click="playScale(true)">Two hand scale</button>
        <button @click="playTwoOctavesScale()">Two Octaves scale</button>
        <button @click="playTwoOctavesScale(true)">Two Octaves Two hand scale</button>
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
          setTimeout(() => this.play(60 + arr[i]), i * 100);
          if (double) setTimeout(() => this.play(60 + 12 + arr[i]), i * 100);
        }
      },
      playTwoOctavesScale(double) {
        let arr = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 23, 21, 19, 17, 16, 14, 12, 11, 9, 7, 5, 4, 2, 0];
        let time = 50;
        let tonic = Math.floor(Math.random() * 36 + 36);
        for (let i in arr) {
          setTimeout(() => this.play(tonic + arr[i]), i * time);
          if (double) setTimeout(() => this.play(tonic + 12 + arr[i]), i * time);
        }
      },
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
        z-index: 10;
    }

    #keyboard > button {
        height: 50px;
    }
</style>