<template>
    <div>
        <NoteView></NoteView>
        <p>Scale trainer: {{this.playedScales.length}}</p>
        <CircleOfFifths  id="fifths" :marked="getPlayedScaleNames()"></CircleOfFifths>
        <button @click="scalePlayed(undefined)">Random scale played</button>
        <Scale :key="index" :index="index" v-for="(scale, index) in playedScales" :scale="scale"></Scale>
        <transition name="fade">
            <div id="ScalePlayed" v-if="visible">
                <Scale :index="cnt" :scale="lastScale()"></Scale>
            </div>
        </transition>
    </div>
</template>
<script>
  import Trainer from '../js/trainer.js'
  import {getMean, getNoteName} from '../js/utilities'
  import Scale from "../components/Scale"
  import CircleOfFifths from '../components/CircleOfFifths'
  import NoteView from "../components/NoteView";

  export default {
    name: 'ScaleTrainer',
    components: {NoteView, Scale, CircleOfFifths},
    data() {
      return {
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
    computed: {
      playedNotes() {
        let notes = this.$store.state.lastNotes;
        return notes.slice(-80);
      }
    },
    methods: {
      getPlayedScaleNames() {
        return this.playedScales.map(scale => {
          return {name: scale.scale, status: this.getStatus(scale)}
        });
      },
      detectScale() {
        let trainer = new Trainer();
        let res = trainer.detectDoubleMajorScale(this.playedNotes);
        if (res) {
          this.$store.commit('clearNotes');
          this.scalePlayed(res);
        }
      },
      scalePlayed(scale) {
        let times = [];
        for (let i = 0; i < 14; i++) {
          times.push(10 + Math.floor(Math.random() * 200))
        }
        if (!scale) {
          scale = {
            scale: getNoteName(Math.floor(Math.random() * 120)),
            time: 3210,
            splitPitches: [],
            velocityVariance: 23,//getVariance(notes.map(note => note.velocity)),
            leftTimes: times,
            rightTimes: [10, 10, 10 + Math.random() * 5, 12, 10, 11, 9, 10, 12, 10],
            leftHandVariance: 12,//getVariance(leftTimes),
            rightHandVariance: 34,//getVariance(rightTimes),
          };
        }

        // this.playedScales.splice(0, 0, scale,);
        this.playedScales.push(scale);
        this.cnt++;
        this.visible = true;
        setTimeout(() => this.visible = false, 3000);
      },
      lastScale() {
        return this.playedScales[this.playedScales.length - 1];
      },
      getStatus(scale) {
        let fail = false;
        let rightMean = getMean(scale.rightTimes);
        scale.rightTimes.forEach(t => {
          if (Math.abs(t - rightMean) > 0.2 * rightMean) {
            fail = true;
          }
        });

        let leftMean = getMean(scale.leftTimes);
        scale.leftTimes.forEach(t => {
          if (Math.abs(t - leftMean) > 0.2 * leftMean) {
            fail = true;
          }
        });

        return fail ? 'fail' : 'ok';
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

    #fifths {
        position: absolute;
        top: 10px;
        right: 20px;
    }
</style>
