<template>
    <div class="home">
        <h1>View</h1>
        <NoteView></NoteView>
<!--        <ul>-->
<!--            <li :key="index" v-for="(note, index) in $store.state.lastNotes">-->
<!--                {{index}}-->
<!--                <strong>PlayTime:</strong> {{note.playTime}}-->
<!--                <strong>diff:</strong> {{(note.playTime % 8196) + 8196 - note.midiTime}}-->
<!--                {{note.playTime % 8196}}-->
<!--            </li>-->
<!--        </ul>-->
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
      return {}
    },
    methods: {
      addNote() {
        this.$store.commit('newNote')
      },
      lastNotes() {
        return this.$store.state.lastNotes;

      }
    }
  }
</script>
