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
        playtimes: [],
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
            let pitch = value.getUint8(pos + 3);
            let midiTime = this.parseTime(value.getUint8(pos), value.getUint8(pos + 1));

            let note = {
              pitch,
              playTime: this.getTime(),
              midiTime,
              velocity,
              channel,
            };
            this.$store.commit('newNote', note)
          } //else {//if (value.getUint8(pos + 2) >> 4 == 0xc) { // Note on
          //   console.log(value.buffer);
          // }
        }
      },
      // format: b1         b2
      //         1ttt tttt 1ttt tttt
      // time is module 8196
      parseTime(b1, b2) {
        let val1 = b1 & 0x7f;
        let val2 = b2 & 0x7f;
        return (val1 << 7) + val2;
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