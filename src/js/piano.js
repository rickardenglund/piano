export function connect(callback, connectedCallback) {
  navigator.bluetooth.requestDevice({
    filters: [{
      services: ['03b80e5a-ede8-4b33-a751-6ce34ec4c700']
    }]
  })
    .then(d => d.gatt.connect())
    .then(server => {
      // eslint-disable-next-line no-console
      console.log('Getting Services...');
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
                  connectedCallback('connected');
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