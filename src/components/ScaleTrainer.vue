<template>
  <div>
    <p>Scale trainer</p>
    <ol>
      <li v-for="note in playedNotes">{{note}}</li>
    </ol>
  </div>
</template>
<script>
  import Trainer from '../trainer.js'

  export default {
    name: 'ScaleTrainer',
    data() {
      return {
        playedNotes: [],
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

        let res = trainer.detectDoubleMajorScale(this.playedNotes.map((note) => note.pitch));
        if (res) {
          console.log('Major scale found');
          this.playedNotes = [];
        }
      }
    }

  }
</script>
<style scoped>

</style>
