<template>
  <div id="noteview">
    <canvas id="notes"></canvas>
  </div>
</template>

<script>
  export default {
    name: "NoteView",
    props: ['notes'],
    watch: {
      notes() {
        let canvas = document.getElementById("notes");
        let ctx = canvas.getContext("2d");
        let width = canvas.width;
        let height = canvas.height;

        const LOW_CUT = 21;
        const N = 109 - LOW_CUT;

        const w = Math.floor(width / N);
        const h = Math.floor(height / this.notes.length);

        ctx.fillStyle = "#aaa";
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < this.notes.length; i++) {
          ctx.fillRect(w*(this.notes[i] - LOW_CUT), i * h, w, h);
        }
      }
    }
  }
</script>

<style scoped>
  #noteview {
  }

  canvas {
    width:100%;
    height: 200px;
    border: solid 1px darkgray;
  }
  p {
    display: inline;
  }
</style>
