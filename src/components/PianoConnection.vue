<template>
    <div>
        <div id="pianoConnection">
            <div v-if="status != 'connected'">
                <button @click="connect">🛑 Connect to Bluetooth device</button>
            </div>
            <div v-else><p>✅ Connected</p></div>
            <StoreView></StoreView>
        </div>
        <VirtualKeyboard></VirtualKeyboard>
    </div>
</template>

<script>
  import {connect} from "../js/piano";
  import VirtualKeyboard from "./VirtualKeyboard";
  import StoreView from "./StoreView";

  export default {
    name: "PianoConnection",
    components: {StoreView, VirtualKeyboard},
    data() {
      return {
        status: 'not connected',
      }
    },
    methods: {
      connect() {
        connect(this.charChanged, (status, midiChannel, server) => {
          this.status = status;
          this.$store.commit('setMidiChannel', midiChannel);
          this.$store.commit('setMidiServer', server);
          setInterval(() => {this.status = server.connected ? 'connected' : 'disconnected'}, 1000)
        });
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
          } //else {//if (value.getUint8(pos + 2) >> 4 == 0xc) { // Note on
          //   console.log(value.buffer);
          // }
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
    #pianoConnection {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #pianoConnection > div {
        margin-left: 10px;
    }
</style>