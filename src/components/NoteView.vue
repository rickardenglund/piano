<template>
  <div id="noteview">
    <canvas id="notes"></canvas>
    <button @click="multiNotes()">Draw random notes</button>
    <ol>
      <li :key="i" v-for="(note, i) in $store.state.lastNotes">
        {{note}}
      </li>
    </ol>
  </div>

</template>

<script>
  export default {
    name: "NoteView",
    data() {
      return {
        drawingActive: true
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
      }
    },
    watch: {
      // notes() {
      //   console.log(this.notes[0].playTime)
      // }
    },
    methods: {
      getTime() {
        let date = new Date();
        return date.getTime();
      },
      draw() {
        if (!this.drawingActive) return;
        let canvas = document.getElementById("notes");
        let ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 400;
        let width = canvas.width;
        let height = canvas.height;
        let now = this.getTime();

        const LOW_CUT = 21;
        const N = 109 - LOW_CUT;

        const w = Math.floor(width / N);
        // const h = Math.floor(height / this.notes.length);

        ctx.fillStyle = "#aaa";
        ctx.clearRect(0, 0, width, height);


        ctx.lineWidth = 0.2;
        for (let i = 0; i <= N; i++) {
          if (this.isBlack(i)) {
            ctx.fillStyle = '#aaa';
          } else {
            ctx.fillStyle = 'white';
          }
          ctx.fillRect(i * w - w / 2, 0, w, height);
          ctx.strokeRect(i * w - w / 2, 0, w, height);
          // ctx.beginPath();
          // ctx.moveTo(i * w - w/2, 0);
          // ctx.lineTo(i*w - w/2, height);
          // ctx.closePath();
          // ctx.stroke();
        }

        for (let i = 0; i < this.notes.length; i++) {
          let pitch = this.notes[i].pitch;
          let startTime = this.notes[i].playTime;
          let velocityFactor = this.notes[i].velocity / 125;
          // ctx.fillRect(w * (pitch - LOW_CUT), (height - (now - startTime)/10), w, h);
          ctx.beginPath();
          ctx.arc(w * ((pitch + 1) - LOW_CUT), (height - (now - startTime) / 20), (w / 2), 0, Math.PI * 2);
          ctx.closePath();
          ctx.lineWidth = 10 * velocityFactor;
          ctx.strokeStyle = '#333'
          ctx.stroke();
          ctx.fillStyle = '#cxaa';
          ctx.fill()
        }

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
</style>
