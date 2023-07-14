import mqtt from 'mqtt/dist/mqtt';

const connectToBroker = () => {
  const client = mqtt.connect('ws://192.115.53.239:9001', {});

  client.on('connect', function () {
    client.subscribe('topic', function (err) {
      if (!err) {
        // Subscription successful
      }
    });
  });

  client.on('message', function (topic, message) {
    const newMessage = message.toString();
    if (newMessage.includes('payload')) {
      // Skip messages containing 'payload'
      return;
    }

    console.log(newMessage); // Log the filtered message
  });

  return client; // Return the MQTT client instance
};

export default connectToBroker;
