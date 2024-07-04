// Import the mqtt library
const mqtt = require('mqtt');

// Define the MQTT broker URL
const brokerUrl =
  'tls:b8ee25b3b83345408a92de05ce886a14.s1.eu.hivemq.cloud:8883';

// Define the options, including username and password if needed
const options = {
  username: 'hivemq.webclient.1719141888085',
  password: 'Kl.7XwO6vh3y8G!L$aV#',
  // Enable debug
  debug: true,
};

// Create a client instance
const client = mqtt.connect(brokerUrl, options);

// Define the topic you want to subscribe to
// const topic = 'test';
const topic = 'esp8266_data';

const getDataTopic = [];

// const LED_STATUS = 'LED';

// Handle connection event
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to the topic
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error(`Failed to subscribe to topic: ${topic}`, err);
    }
  });

  // Subscribe to the topic
  // client.subscribe(LED_STATUS, (err) => {
  //   if (!err) {
  //     console.log(`Subscribed to LED_STATUS: ${LED_STATUS}`);
  //   } else {
  //     console.error(`Failed to subscribe to LED_STATUS: ${LED_STATUS}`, err);
  //   }
  // });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  // message is a Buffer
  console.log(`Received message from ${topic}: ${message.toString()}`);
});

// Handle incoming messages
// client.on('message', (LED_STATUS, message) => {
//   // message is a Buffer
//   console.log(`Received message from=> ${LED_STATUS}: ${message.toString()}`);
// });

// Handle error event
client.on('error', (err) => {
  console.error('Connection error: ', err);
});

// Handle close event
client.on('close', () => {
  console.log('Connection closed');
});

// Handle offline event
client.on('offline', () => {
  console.log('Client is offline');
});

client.publish('led_state', '1');

// Handle reconnect event
client.on('reconnect', () => {
  console.log('Reconnecting to MQTT broker');
});
