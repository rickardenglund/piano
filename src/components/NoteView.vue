<template>
  <div id="noteview">
    <svg :viewBox="`0 0 ${width} ${height}`" width="100%">
      <rect v-for="i in 109-21" :key="i" :x="i*(width/N) - (width/N/2)" y="0" width="10" :height="height" :fill="isBlack(i)?'black':'white'" stroke-width=".5" stroke="gray"/>
      <circle v-for="note in notes" :key="note.playTime.toString() + note.pitch" :r="width/N/2" :cx="(1+ note.pitch - LOW_CUT)*width/N" :cy="height - (now - note.playTime)/20" fill="green"/>
    </svg>
    <p>{{N}} {{notes.length}}</p>
    <button @click="multiNotes()">Draw random notes</button>
  </div>

</template>

<script>
  export default {
    name: "NoteView",
    data() {
      return {
        drawingActive: true,
        nextKey: 1,
        height: 500,
        width: 1000,
        now: this.getTime()
      }
    },
    mounted() {
      this.drawingActive = true;
      window.requestAnimationFrame(this.draw)
    },
    destroyed() {
      this.drawingActive = false;
    },
    computed: {
      notes() {
        return this.$store.state.lastNotes.slice(-40);
      },
      N() {
        return 109 - this.LOW_CUT;
      },
      LOW_CUT() {
        return 21;
      },
    },
    watch: {
      // notes() {
      //   console.log(this.notes[0].playTime)
      // }
    },
    methods: {
      key()  {
        return this.nextKey++
      },
      getTime() {
        let date = new Date();
        return date.getTime();
      },
      draw() {
        this.now = this.getTime()

        window.requestAnimationFrame(this.draw)
      },
      isBlack(i) {
        return [2, 5, 7, 10, 12, 14, 17, 19, 22, 24, 26, 29, 31, 34, 36, 38, 41, 43, 46, 48, 50, 53, 55, 58, 60, 62, 65, 67, 70, 72, 74, 77, 79, 82,84,86].includes(i);
      },
      multiNotes() {
        for (let i = 0; i < 30; i++) {
          setTimeout(this.randomNote, i * 100);
        }
      },
      randomNote() {
        let now = this.getTime();
        let randomPitch = Math.floor(Math.random() * 100) + 30;
        let velocity = Math.floor(Math.random() * 126);
        let note = {
          pitch: randomPitch,
          playTime: now,
          velocity
        };
        this.notes.push(note);
        if (this.notes.length > 40) this.notes.shift()
      }
    }
  }
</script>

<style scoped>
  #noteview {
  }


  p {
    display: inline;
  }

  svg {
    border: 2px solid gray;
  }
</style>
