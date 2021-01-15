const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'j7VUD7m9fw-WyDgVsPjowt-VeZGTQc21L1H3W1T16bkv',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/9360e3fa-17a4-4755-9c37-f880d94a2889',
});

const params = {
  objectMode: true,
  contentType: 'audio/mp3',
  model: 'pt-BR_NarrowbandModel',
  keywords: ['teste'],
  keywordsThreshold: 0.5,
  maxAlternatives: 3,
};

// Create the stream.
const recognizeStream = speechToText.recognizeUsingWebSocket(params);

// Pipe in the audio.
fs.createReadStream('teste.mp3').pipe(recognizeStream);

recognizeStream.on('data', function(event) { onEvent('Data:', event); });
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close', function(event) { onEvent('Close:', event); });

// Display events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
};