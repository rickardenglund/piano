<template>
  <div>
    <p>Scale trainer: {{this.playedScales.length}}</p>
    <button @click="scalePlayed(undefined)">Success</button>
      <Scale :key="index" :index="index" v-for="(scale, index) in playedScales" :scale="scale"></Scale>
    <transition name="fade">
      <div id="ScalePlayed" v-if="visible">
        <Scale :index="cnt" :scale="lastScale()"></Scale>
      </div>
    </transition>
  </div>
</template>
<script>
  import Trainer from '../trainer.js'
  import {getNoteName} from '../utilities'
  import Scale from "./Scale"

  export default {
    name: 'ScaleTrainer',
    components: {Scale},
    data() {
      return {
        playedNotes: [],
        playedScales: [],
        visible: false,
        cnt: 0,
      }
    },
    watch: {
      playedNotes() {
        this.detectScale();
      }
    },
    methods: {
      played(note) {
        this.playedNotes.push(note);
      },
      detectScale() {
        let trainer = new Trainer();
        let res = trainer.detectDoubleMajorScale(this.playedNotes);
        if (res) {
          console.log('Major scale found');
          this.playedNotes = [];
          this.scalePlayed(res);
        }
      },
      scalePlayed(scale) {
        let times = [];
        for (let i = 0; i < 14; i++) {
          times.push(10 + Math.floor(Math.random()*200))
        }
        if (!scale) {
          scale = {
            scale: getNoteName(Math.floor(Math.random() * 120)),
            time: 3210,
            splitPitches: [],
            velocityVariance: 23,//getVariance(notes.map(note => note.velocity)),
            leftTimes: times,
            rightTimes: [10, 10, 10, 20, 10, 11, 5, 10, 34, 10],
            leftHandVariance: 12,//getVariance(leftTimes),
            rightHandVariance: 34,//getVariance(rightTimes),
          };
        }

        // this.playedScales.splice(0, 0, scale,);
        this.playedScales.push(scale);
        this.cnt++
        this.visible = true;
        setTimeout(() => this.visible = false, 3000);
      },
      lastScale() {
        let scale = this.playedScales[this.playedScales.length - 1];
        return scale;
      }
    }

  }
</script>
<style scoped>
  div#ScalePlayed {
    background-color: white;
    padding: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
