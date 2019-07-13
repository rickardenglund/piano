<template>
  <div id="trainer">
    <p>score: {{scores.length}}️</p>
    <p v-if="correct()"> Success</p>
    <p v-if="message">{{message}}</p>
    <div>
      <label for="sequence-length">Sequence length:</label>
      <input id="sequence-length" type="number" min="1" max="20" v-model="sequenceLength"/>
    </div>
    <div>
      <label for="pitch-variation">Pitch variation:</label>
      <input id="pitch-variation" type="number" min="1" max="20" v-model="pitchVariation"/>
    </div>
    <button @click="generate">New Sequence</button>
    <button v-if="sequence.length > 0" @click="repeat">Repeat</button>
  </div>
</template>
<script>
  import {playNotes} from '../js/piano'
  export default {
    name: 'repeatTrainer',
    data() {
      return {
        scores: [],
        sequence: [],
        message: "",
        sequenceLength: 3,
        pitchVariation: 5,
      }
    },
    computed: {
      score() {
        if (this.scores.length == 0) return 0;
        return this.scores.reduce((total, n) => total + n, 0) / this.scores.length
      },
      playedNotes() {
        let notes = this.$store.state.lastNotes;
        return notes.slice(-1 * this.sequence.length);
      }
    },
    methods: {
      repeat() {
        playNotes(this.sequence, this.$store.state.midiChannel);
      },
      generate: function () {
        const majorScaleOffsets = [0, 2, 4, 5, 7, 9, 11];
        let s = [];
        for (let i = 0; i < this.sequenceLength; i++) {
          let index = Math.floor(Math.random() * this.pitchVariation);
          s.push(majorScaleOffsets[index % majorScaleOffsets.length] + 12 * Math.floor(index / majorScaleOffsets.length) + 60);
        }

        // eslint-disable-next-line no-console
        console.log(s);
        this.sequence = s;
        // this.$emit('play', this.sequence);
        playNotes(this.sequence, this.$store.state.midiChannel);

        this.message = "Play the sequence";
      },
      // played(note) {
      //   // console.log(note)
      //   if (this.playedNotes.length > this.sequence.length) this.playedNotes.shift();
      //
      //   this.playedNotes.push(note);
      //
      // },
      updateScore() {
        let score = this.playedNotes.length - this.sequence.length;
        // eslint-disable-next-line no-console
        console.log('score: ' + score);
        this.scores.push(score)
      },
      correct() {
        for (let i = 0; i < this.playedNotes.length - this.sequence.length + 1; i++) {
          for (let j = 0; j < this.sequence.length; j++) {
            if (this.playedNotes[i + j].pitch != this.sequence[j]) {
              break;
            }
            if (j == this.sequence.length - 1) {
              this.message = "Nice!, wait for next";
              this.updateScore();
              playNotes([65], this.$store.state.midiChannel);

              this.sequence = [-1];
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
    padding: 20px;
  }
</style>
