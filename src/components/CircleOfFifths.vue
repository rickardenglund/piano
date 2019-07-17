<template>

  <div class="fifths">
    <p :key="i" class="part"
       :class="{isMarked: isMarked((i+2)*7), ok: getStatus((i+2)*7) == 'ok', warning: getStatus((i+2)*7) == 'warning', fail: getStatus((i+2)*7) == 'fail'}"
       v-for="i in 12">{{getName((i+2)*7)}}</p>
  </div>
</template>

<script>
  import {getNoteName} from "../js/utilities";

  export default {
    name: "CircleOfFifths",
    props: {
      marked: {
        type: Array,
        default: () => [],
      }
    },
    methods: {
      getName(i) {
        return getNoteName(i);
      },
      getX(w, r) {
        return r * Math.cos(w);
      },
      getY(w, r) {
        return r * Math.sin(w);
      },
      isMarked(i) {
        let noteName = getNoteName(i);
        return this.marked.find(o => o.name == noteName);
      },
      getStatus(i) {
        let noteName = getNoteName(i);
        let scales = this.marked.filter(o => o.name == noteName);
        if (scales.length > 0) {
          return scales.find(o => o.status == 'ok') ? 'ok' : 'fail';
        }
        return '';
      }

    },
    mounted() {
      for (let i = 0; i < this.$el.children.length; i++) {
        this.$el.children[i].style.top = this.getY(Math.PI / 6 * i, 100) + 90 + 'px';
        this.$el.children[i].style.left = this.getX(Math.PI / 6 * i, 100) + 115 + 'px';
      }
    }
  }
</script>

<style scoped>
  .fifths {
    position: relative;
    float: right;
    background-color: white;
    width: 250px;
    height: 250px;
    z-index: 5;
    border: darkgray solid 5px;
  }

  .part {
    position: absolute;
    left: 100px;
    top: 100px;
    padding: 5px;
    color: rgba(0, 0, 0, 0.5);
  }

  .isMarked {
    font-weight: bold;
    border-radius: 20px;
    border: solid rgba(0, 0, 0, 0.1) 5px;
  }

  .ok {
    color: rgba(10, 200, 0, 0.8);
  }

  .warning {
    color: rgba(200, 200, 0, 0.8);
  }

  .fail {
    color: rgba(220, 0, 0, 0.8);
  }

</style>
