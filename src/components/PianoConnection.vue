<template>
    <div>
        <button v-if="status != 'connected'" @click="connect">Connect to Bluetooth device</button>
        <div v-else><p>Connected</p></div>
    </div>
</template>

<script>
  import {connect} from "../js/piano";

  export default {
    name: "PianoConnection",
    data() {
      return {
        status: 'not connected',
      }
    },
    methods: {
      connect() {
        connect(this.charChanged, (status) => this.status = status);
      },
      charChanged(event) {
        let value = event.target.value;
        // let a = [];
        const messageSize = 4;

        // console.log(value);

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