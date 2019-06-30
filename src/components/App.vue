<template>
  <div id="app">
    <div v-if="!midiChannel">
      <button @click="connect">Connect to Bluetooth device</button>
    </div>
    <div v-else>
      <NoteView :notes="lastNotes"></NoteView>
      <Trainer @play="playNotes"/>
      <ScaleTrainer/>
    </div>
<!--    <Tests/>-->
  </div>
</template>

<script>
  import NoteView from './NoteView'
  import Trainer from "./Trainer";
  import ScaleTrainer from "./ScaleTrainer";
  import Tests from "./Tests";

  export default {
    name: 'app',
    components: {Tests, ScaleTrainer, Trainer, NoteView},
    data() {
      return {
        midiChannel: null,
        note: 65,
        instrument: 1,
        lastNotes: []
      }
    },
    methods: {
      playNotes(notes) {
        for (let i = 0; i < notes.length; i++) {
          this.playNoteIn(notes[i], i * 500 + i * 100);
        }
      },
      setInstrument() {
        let setInstrument_msg = new Uint8Array([0x80, 0x80, 0xc3, this.instrument]);
        this.midiChannel.writeValue(setInstrument_msg)
      },
      play(note) {
        this.playNote(note);
        setTimeout(() => this.stopNote(note), 500)
      },
      playNoteIn(note, time) {
        setTimeout(() => this.play(note), time);
      },
      playNote(note) {
        let msg_on = new Uint8Array([0x80, 0x80, 0x93, note, 0x1f]);
        this.midiChannel.writeValue(msg_on);

      },
      stopNote(note) {
        let msg_off = new Uint8Array([0x80, 0x80, 0x83, note, 0xff]);
        this.midiChannel.writeValue(msg_off)
          .catch(e => {
            console.log(e)
          })
      },
      getTime() {
        let date = new Date();
        return date.getTime();
      },
      charChanged(event) {
        let value = event.target.value;
        let a = [];
        const messageSize = 4;

        console.log(value);

        for (let pos = 0; pos + messageSize < event.target.value.byteLength; pos += messageSize) { // all messages
          if (value.getUint8(pos+2) >> 4 == 9) { // Note on
            let channel = value.getUint8(pos+2) & 15;
            let velocity = value.getUint8(pos+4);
            console.log("Channel: " + channel);
            console.log("Velocity: " + velocity);
            if (this.lastNotes.length > 20) this.lastNotes.shift();
            let pitch = value.getUint8(pos+3);
            let note = {
              pitch,
              playTime: this.getTime(),
              velocity
            };
            this.lastNotes.push(note);

            // to trainer
            console.log(this.$children[2]);
            this.$children[1].played(note.pitch);
            this.$children[2].played(note);
          }
        }
      },

      connect() {
        navigator.bluetooth.requestDevice({
          filters: [{
            services: ['03b80e5a-ede8-4b33-a751-6ce34ec4c700']
          }]
        })
          .then(d => d.gatt.connect())
          .then(server => {
            console.log('Getting Services...');
            return server.getPrimaryServices();
          })
          .then(services => {
            console.log('Getting Characteristics...');
            let queue = Promise.resolve();
            services.forEach(service => {
              queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                console.log('> Service: ' + service.uuid);
                characteristics.forEach(characteristic => {
                  console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                    getSupportedProperties(characteristic));
                  if (characteristic.uuid == '7772e5db-3868-4112-a1a9-f2669d106bf3') {
                    console.log(characteristic)
                    characteristic.startNotifications().then(_ => {
                      console.log('> Notifications started');
                      characteristic.addEventListener('characteristicvaluechanged', this.charChanged);
                      this.midiChannel = characteristic;
                    });
                  }
                });
              }));
            });
            return queue;
          })
          .catch(error => {
            console.log('Argh! ' + error);
          });

      }
    }
  }

  function getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {

      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
  }
</script>

<!-- CSS libraries -->

<!-- Global CSS -->
<style>
  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style>
  body {
    background-color: antiquewhite;
  }

  #app {
    margin: 20px;
  }

  #app h1 {
    color: #2c3e50;
    font-weight: 300;
  }

  .banner {
    height: 200px;
    background-color: #f6f6f6;
    padding: 50px 10px;
  }

  .bottom {
    padding: 80px 10px;
    font-size: 24px;
    font-weight: 300;
  }

  .fade {
    font-size: 14px;
  }

  .logo {
    animation: spin 4s 1s infinite linear
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
