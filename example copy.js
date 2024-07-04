/*
 * Copyright 2021 HiveMQ GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const mqtt = require('mqtt');

// your credentials
const options = {
  username: 'hivemq.webclient.1719141888085',
  password: 'Kl.7XwO6vh3y8G!L$aV#',
};

// connect to your cluster, insert your host name and port
const client = mqtt.connect(
  'tls:b8ee25b3b83345408a92de05ce886a14.s1.eu.hivemq.cloud:8883',
  options
);

// prints a received message
client.on('message', function (topic, message) {
  console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('connected  ' + client.connected);
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
// });

// subscribe and publish to the same topic
// client.subscribe('messages');
//client.subscribe('temperature');
const _clientId = client.subscribe('deviceId');
//console.log('clientId->:', _clientId);
console.log('subscribe clientId->:', _clientId.options.clientId);

// const _NodeMCU = client.subscribe('NodeMCU');
// console.log('_NodeMCU->:', _NodeMCU);

// Receive Message and print on terminal
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(topic.toString());
//   console.log(message.toString());
// });

//client.publish('messages', 'Hello, this message was received!');
client.publish('led_state', '0');

client.end();
