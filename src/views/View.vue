<template>
  <div class="home">
    <h1>View</h1>
    <VirtualKeyboard></VirtualKeyboard>
    <NoteView></NoteView>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import NoteView from "../components/NoteView";
import VirtualKeyboard from "../components/VirtualKeyboard";
export default {
  name: 'noteview',
  components: {
    VirtualKeyboard,
    NoteView
  },
  data() {
    return {
    }
  },
  methods: {
    addNote() {
      this.$store.commit('newNote')
    }
  }
}
</script>
