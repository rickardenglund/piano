<template>
  <div class="home">
    <h1>View</h1>
    <NoteView></NoteView>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import NoteView from "../components/NoteView";
export default {
  name: 'noteview',
  components: {
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
