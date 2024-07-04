// Import the mqtt library
const mqtt = require('mqtt');

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
const https = require('https');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const topic = 'esp8266_data';

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
// const topic = 'esp8266_data';

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
  console.log(`### Received message from ${topic}: ${message.toString()}`);

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
  // console.log('/ post', req.body.led);
  // client.publish('led_state', req.body.led);
  // res.send('POST ');

  client.publish(
    'led_state',
    req.body.led,
    { qos: 1, retain: false },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Published');
        res.send({ led_status: req.body.led });

        //
        // var _myJSON = '';

        // client.on('message', (topic, message) => {
        //   console.log(
        //     `### Received message from ${topic}: ${message.toString()}`
        //   );

        //   // const myJSON = JSON.stringify(message);
        //   _myJSON = JSON.parse(message.toString());
        //   console.log('_myJSON-> ', _myJSON);

        //   console.log('_myJSON temperature-> ', _myJSON.temperature);
        //   console.log('_myJSON humidity-> ', _myJSON.humidity);
        //   console.log('_myJSON led_status:-> ', _myJSON.led_status);
        // });

        // res.send({ led_status: _myJSON.led_status });
        //
      }
    }
  );
  client.on('close', () => {
    console.log('Connection closed');
  });
});

app.get('/nodemcu', (req, res) => {
  console.log('/ nodemcu');

  res.send({ message: myJSON });
  client.on('close', () => {
    console.log('Connection closed');
  });
});

app.get('/sub', (req, res) => {
  console.log('/ sub');
  //const topiced = 'esp8266_data';
  client.subscribe(topic, { qos: 1 }, function (error, granted) {
    if (error) {
      console.log(error);
    } else {
      // console.log(`sub---> ${granted} was subscribed`);
      console.log(`granted---> `, granted);
      console.log(`granted[0]---> `, granted[0].topic);
      res.send({
        topic: granted[0].topic,
        deviceId: myJSON.deviceId,
        siteId: myJSON.siteId,
        humidity: myJSON.humidity,
        temperature: myJSON.temperature,
        led_status: myJSON.led_status,
      });
    }
  });
  client.on('close', () => {
    console.log('Connection closed');
  });

  // res.send('sub');
});

app.get('/', (req, res) => {
  console.log('get path -----');
  res.send('GET ');
});

// line
//=====================================
let TOKEN_Bot_Marketing =
  'tvb2bkJUvF5ZbSzAf9WDSmfwbwRDxI/2Nlw1TROa2XbaSAXdySiT1w4OvRQrTWPcZXSWvNn1cwlZtBkjly5fhhubxbIXzxZ5sAqnk0644k4l1ShKzP2MXJxZ50Wd1L0d1Yba6vX1JVDQYA/EBH2DbgdB04t89/1O/w1cDnyilFU=';
let TOKEN_Bot_Marketing_Destination = 'U07ab7da94695cca39e6333e9a7db7ba7';

//=====
let TOKEN_BotMKT =
  'XCbn+/dWhb3qNdTx3tGnQqeomc6z0IESqX2FZ6m+2e+lthKeE4qwGjVHG/+Tz0jLwdKeJrvIXP6262lbzvXF+vm64Q0NL6wVtvaX2dTog/aFmOpQ82MOqWHKA8RsK7KfklLW6AAcInzGDLyFtxhB1gdB04t89/1O/w1cDnyilFU=';
let TOKEN_BotMKT_Destination = 'U7686c4d09de152d2bb7902096764875b';
//====
app.post('/lineNodeMcu', (req, res) => {
  let msg = '';
  let onOff = '';
  let channelAccessToken = '';

  if (req.body.events[0].message.text == '0') {
    console.log(
      'req.body.events[0].message.text สั่งดับไฟ',
      req.body.events[0].message.text
    );
    onOff = 'สั่งดับไฟ';
    onoff('0');
  } else {
    console.log(
      'req.body.events[0].message.text สั่งเปิดไฟ',
      req.body.events[0].message.text
    );
    onOff = 'สั่งเปิดไฟ';
    onoff('1');
  }

  switch (req.body.destination) {
    case TOKEN_Bot_Marketing_Destination:
      msg = onOff;
      channelAccessToken = TOKEN_Bot_Marketing;
      break;

    case TOKEN_BotMKT_Destination:
      msg = onOff;
      channelAccessToken = TOKEN_BotMKT;
      break;
  }

  if (req.body.events[0].type === 'message') {
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: 'text',
          text: msg,
        },
      ],
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + channelAccessToken,
    };

    const webhookOptions = {
      hostname: 'api.line.me',
      path: '/v2/bot/message/reply',
      method: 'POST',
      headers: headers,
      body: dataString,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    request.on('error', (err) => {
      console.error(err);
    });

    request.write(dataString);
    request.end();
  }
});

//
function onoff(value) {
  console.log(`value, ${value}!`);
  client.publish(
    'led_state',
    value,
    { QoS: 1, retain: false },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Published');
      }
    }
  );
  client.on('close', () => {
    console.log('Connection closed');
  });
}

// End line
//=====================================
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'));
});
