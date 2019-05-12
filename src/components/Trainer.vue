<template>
  <div id="trainer">
    <p>score: #{{scores.length}} - {{Math.round(score*100)/100}} 🎯️</p>
    <p v-if="correct()"> Success</p>
    <p v-if="message">{{message}}</p>
    <button v-if="sequence.length > 0" @click="repeat">Repeat</button>
    <button @click="generate">New Sequence</button>
    <!--    <p>Sequence: {{sequence}}</p>-->
  </div>
</template>
<script>
  export default {
    name: 'Trainer',
    data() {
      return {
        scores: [],
        sequence: [],
        playedNotes: [],
        message: "",
      }
    },
    computed: {
      score() {
        if (this.scores.length == 0) return 0;
        return this.scores.reduce((total, n) => total + n, 0) / this.scores.length
      }
    },
    methods: {
      repeat() {
        this.$emit('play', this.sequence)
      },
      generate() {
        const majorScaleOffsets = [0, 2, 4, 5, 7, 9, 11];
        console.log('sending');
        let s = [];
        for (let i = 0; i < 3; i++) {
          let index = Math.floor(Math.random()*5);
          s.push(majorScaleOffsets[index] + 60);
        }

        console.log(s);
        this.sequence = s;
        this.$emit('play', this.sequence);
        this.message = "Play the sequence";
      },
      played(note) {
        this.playedNotes.push(note);
      },
      updateScore() {
        let score = this.playedNotes.length - this.sequence.length;
        console.log('score: ' + score);
        this.scores.push(score)
      },
      correct() {
        for (let i = 0; i < this.playedNotes.length - this.sequence.length + 1; i++) {
          for (let j = 0; j < this.sequence.length; j++) {
            if (this.playedNotes[i + j] != this.sequence[j]) {
              break;
            }
            if (j == this.sequence.length - 1) {
              this.message = "Nice!, wait for next";
              this.updateScore(this.score);
              this.$emit('play', [65]);
              this.playedNotes = [];
              setTimeout(() => this.generate(), 1000);
              return true;
            }
          }
        }
        return false;
      }
    }
  }
</script>


<style scoped>
#trainer {
  padding:20px;
}
</style>
