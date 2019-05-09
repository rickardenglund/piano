<template>
  <div>
    <button @click="generate">New Sequence</button>
    <button v-if="sequence.length > 0" @click="repeat">Repeat</button>
    <p>Score: {{score}}</p>
<!--    <p>{{playedNotes}}</p>-->
    <p v-if="correct()"> Success</p>
    <p v-if="message">{{message}}</p>
<!--    <p>Sequence: {{sequence}}</p>-->
  </div>
</template>
<script>
  export default {
    name: 'Trainer',
    // props: ['playedNotes'],
    data() {
      return {
        score: 0,
        sequence: [],
        playedNotes: [],
        message: "",
      }
    },
    methods: {
      repeat() {
        this.$emit('play', this.sequence)
      },
      generate() {
        console.log('sending');
        let s = [];
        for (let i = 0; i <3; i++) {
          s[i] = Math.floor(Math.random()*5 + 65)
        }
        this.sequence = s;
        this.$emit('play', this.sequence)
        this.message = "Play the sequence";
      },
      played(note) {
        this.playedNotes.push(note);
      },
      correct() {
        for (let i = 0; i < this.playedNotes.length - this.sequence.length + 1; i++) {
          for (let j = 0; j < this.sequence.length; j++) {
            if (this.playedNotes[i+j] != this.sequence[j]) {
              break;
            }
            if (j == this.sequence.length - 1) {
              this.message = "Nice!, wait for next";
              this.score ++;
              this.$emit('play', [65]);
              this.playedNotes = [];
              setTimeout(() => this.generate(), 2000);
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

</style>
