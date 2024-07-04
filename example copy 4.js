// Import the mqtt library
const mqtt = require('mqtt');

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
});

var myJSON = '';

// Handle incoming messages
client.on('message', (topic, message) => {
  // message is a Buffer
  console.log(`Received message from ${topic}: ${message.toString()}`);

  // const myJSON = JSON.stringify(message);
  myJSON = JSON.parse(message.toString());
  console.log('myJSON-> ', myJSON);

  console.log('myJSON temperature-> ', myJSON.temperature);
  console.log('myJSON humidity-> ', myJSON.humidity);
  console.log('myJSON led_status:-> ', myJSON.led_status);
});

// Handle error event
client.on('error', (err) => {
  console.error('Connection error: ', err);
});

// // Handle close event
client.on('close', () => {
  console.log('Connection closed');
});

// // Handle offline event
client.on('offline', () => {
  console.log('Client is offline');
});

// client.publish('led_state', '1');

// Handle reconnect event
client.on('reconnect', () => {
  console.log('Reconnecting to MQTT broker');
});

app.post('/', (req, res) => {
  console.log('/ post', req.body.led);
  client.publish('led_state', req.body.led);
  res.send('POST ');
});

app.get('/nodemcu', (req, res) => {
  console.log('/ nodemcu');

  res.send({ message: myJSON });
});

app.get('/', (req, res) => {
  res.send('GET ');
});

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'));
});
