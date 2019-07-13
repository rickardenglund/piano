<template>
    <div>
        <div v-if="status != 'connected'">
            <button @click="connect">Connect to Bluetooth device</button>

        </div>
        <div v-else><p>Connected</p></div>
        <div>
            <VirtualKeyboard></VirtualKeyboard>
        </div>
    </div>
</template>

<script>
  import {connect} from "../js/piano";
  import VirtualKeyboard from "./VirtualKeyboard";

  export default {
    name: "PianoConnection",
    components: {VirtualKeyboard},
    data() {
      return {
        status: 'not connected',
      }
    },
    methods: {
      connect() {
        connect(this.charChanged, (status, midiChannel) => {this.status = status; this.$store.commit('setMidiChannel', midiChannel)});
      },
      charChanged(event) {
        let value = event.target.value;
        const messageSize = 4;
        for (let pos = 0; pos + messageSize < event.target.value.byteLength; pos += messageSize) { // all messages
          if (value.getUint8(pos + 2) >> 4 == 9) { // Note on
            let channel = value.getUint8(pos + 2) & 15;
            let velocity = value.getUint8(pos + 4);
            // if (this.lastNotes.length > 20) this.lastNotes.shift();
            let pitch = value.getUint8(pos + 3);
            let note = {
              pitch,
              playTime: this.getTime(),
              velocity,
              channel,
            };
            this.$store.commit('newNote', note)
          }
        }
      },
      getTime() {
        let date = new Date();
        return date.getTime();
      },
    }
  }
</script>

<style scoped>

</style>