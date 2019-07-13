<template>
  <div class="home">
    <NoteView :notes="lastNotes"></NoteView>
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
      lastNotes: [],
    }
  }
}
</script>
