<template>
  <div>
    <p>Scale trainer</p>
    <button @click="scalePlayed">Success</button>
    <ol>
      <li v-for="scale in playedScales">
        {{scale.scale}} : {{scale.time.toFixed(2)}} ms
      </li>
    </ol>
    <ol>
      <li v-for="note in playedNotes">{{note}}</li>
    </ol>
    <transition name="fade">
      <div id="ScalePlayed" v-if="visible">
        <p>Scale: {{lastScale()}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
  import Trainer from '../trainer.js'
  import getNoteName from '../utilities'

  export default {
    name: 'ScaleTrainer',
    data() {
      return {
        playedNotes: [],
        playedScales: [],
        visible: false,
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
        if (!scale) {
          let scaleName = getNoteName(Math.floor(Math.random() * 120));
          scale = {scale: scaleName, time: 1 + Math.random() * 125};
        }

        this.playedScales.push(scale);
        this.visible = true;
        setTimeout(() => this.visible = false, 1500);
      },
      lastScale() {
        let scale = this.playedScales[this.playedScales.length - 1];
        return scale.scale + ' : ' +
          scale.time.toFixed() + ' s';

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
