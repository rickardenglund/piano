<template>
    <div>
    <h1>Playback</h1>
        <button @click="setInstrument">setInstrument</button>
        <button @click="play">play</button>
        <label for="instrument">Instrument: </label><input @keyup.enter="play" type="number" id="instrument" v-model="instrument"/>
        <label for="note">Note: {{getNoteName(note)}}</label><input type="number" id="note" v-model="note"/>

        <button @click="noteOn()">Note on</button>
        <button @click="clear()">Clear</button>


    </div>
</template>

<script>
  import {allNoteOff, playNote, playNotes, setInstrument} from "../js/piano";
  import {toName} from "../js/utilities";

  export default {
    name: "Playback",
    data() {
      return {
        instrument: 48,
        note: 65,
      }
    },
    methods: {
      getNoteName(pitch) {
        return toName(pitch);
      },
      setInstrument() {
        setInstrument(this.instrument, this.$store.state.midiChannel);
        // playNotes([65, 66], this.$store.state.midiChannel);
      },
      play() {
        this.setInstrument();
        setTimeout(() => playNotes([65,67,69], this.$store.state.midiChannel), 100);
      },
      noteOn() {
        playNote(this.note, this.$store.state.midiChannel)
      },
      clear() {
        allNoteOff(this.$store.state.midiChannel)
      }
    }
  }
</script>

<style scoped>

</style>