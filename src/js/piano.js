export function connect(callback, connectedCallback) {
  let device = undefined;
  navigator.bluetooth.requestDevice({
    filters: [{
      services: ['03b80e5a-ede8-4b33-a751-6ce34ec4c700']
    }]
  })
    .then(d => d.gatt.connect())
    .then(server => {
      // eslint-disable-next-line no-console
      console.log('Getting Services...');
      device = server;
      return server.getPrimaryServices();
    })
    .then(services => {
      // eslint-disable-next-line no-console
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(() => {
          return service.getCharacteristics().then(characteristics => {
            // eslint-disable-next-line no-console
            console.log('> Service: ' + service.uuid);
            characteristics.forEach(characteristic => {
              // eslint-disable-next-line no-console
              console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                                                        getSupportedProperties(characteristic));
              if (characteristic.uuid == '7772e5db-3868-4112-a1a9-f2669d106bf3') {
                characteristic.startNotifications().then(() => {
                  // eslint-disable-next-line no-console
                  console.log('> Notifications started');
                  characteristic.addEventListener('characteristicvaluechanged', callback);
                  connectedCallback('connected', characteristic, device);
                  return characteristic;
                });
              }
            });
          });
        });
      });
      return queue;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Argh! ' + error);
      connectedCallback('not connected');
    });

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

export function playNotes(notes, midiChannel) {
  for (let i = 0; i < notes.length; i++) {
    playNoteIn(notes[i], i * 500 + i * 100, midiChannel);
  }
}
// export function setInstrument() {
//   let setInstrument_msg = new Uint8Array([0x80, 0x80, 0xc3, this.instrument]);
//   this.midiChannel.writeValue(setInstrument_msg)
// }
export function play(note, midiChannel) {
  playNote(note, midiChannel);
  setTimeout(() => stopNote(note, midiChannel), 500)
}
export function playNoteIn(note, time, midiChannel) {
  setTimeout(() => play(note, midiChannel), time);
}
export function playNote(note, midiChannel, velocity) {
  if (!velocity) velocity = 0x1f;
  let msg_on = new Uint8Array([0x80, 0x80, 0x93, note, velocity]);
  midiChannel.writeValue(msg_on);
}
export function stopNote(note, midiChannel) {
  let msg_off = new Uint8Array([0x80, 0x80, 0x83, note, 0xff]);
  midiChannel.writeValue(msg_off)
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
}

export function setInstrument(instrument, midiChannel) {
  let msg_on = new Uint8Array([0x80, 0x80, 0xc3, 0x00, instrument]);
  midiChannel.writeValue(msg_on);
}

export function allNoteOff(midiChannel) {
  let msg_on = new Uint8Array([0x80, 0x80, 0xb3, 120, 0]);
  midiChannel.writeValue(msg_on);
}
