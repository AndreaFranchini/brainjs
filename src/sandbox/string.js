'use strict';

const brain = require('brain.js');

const helloNet = new brain.NeuralNetwork({
  // binaryThresh: 0.5,
  // hiddenLayers: [], // array of ints for the sizes of the hidden layers in the network
  // activation: 'relu', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  // leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
});

const trainingInputs = [
  'how are you',
  'how is your day',
  'good day',
  'how is going today',

  'have a nice day',
  'see you later',
  'have a nice day',
  'talk to you soon',

  'make me a sandwich',
  'can you make sandwich',
  'having a sandwich today',
  'whats for lunch',
];

const getUniqueWords = (strings) => {
  const result = [];
  strings.forEach((str) => {
    const splits = str.split(' ');
    splits.forEach((spl) => {
      if (!result.includes(spl)) {
        result.push(spl);
      }
    });
  });
  return result;
};

const uniqueWords = getUniqueWords(trainingInputs);

const stringToBit = (string) => {
  const phrase = string.split(' ');
  return uniqueWords.map(word => (phrase.includes(word) ? 1 : 0));
};

const trainingData = [
  { output: { greeting: 1 }, input: stringToBit(trainingInputs[0]) },
  { output: { greeting: 1 }, input: stringToBit(trainingInputs[1]) },
  { output: { greeting: 1 }, input: stringToBit(trainingInputs[2]) },
  { output: { greeting: 1 }, input: stringToBit(trainingInputs[3]) },

  { output: { goodbye: 1 }, input: stringToBit(trainingInputs[4]) },
  { output: { goodbye: 1 }, input: stringToBit(trainingInputs[5]) },
  { output: { goodbye: 1 }, input: stringToBit(trainingInputs[6]) },
  { output: { goodbye: 1 }, input: stringToBit(trainingInputs[7]) },

  { output: { sandwich: 1 }, input: stringToBit(trainingInputs[8]) },
  { output: { sandwich: 1 }, input: stringToBit(trainingInputs[9]) },
  { output: { sandwich: 1 }, input: stringToBit(trainingInputs[10]) },
  { output: { sandwich: 1 }, input: stringToBit(trainingInputs[11]) },
];

const trainResult = helloNet.train(trainingData, {
  errorThresh: 0.005, // error threshold to reach
  iterations: 20000, // maximum training iterations
  log: false, // console.log() progress periodically
  logPeriod: 100, // number of iterations between logging
  learningRate: 0.3, // learning rate
});

console.log('\ntrainResult');
console.log(trainResult);

console.log('\nsee you buddy');
console.log(helloNet.run(stringToBit('see you buddy')));

console.log('\nhi man how are you');
console.log(helloNet.run(stringToBit('hi man how are you')));

console.log('\ncan you make me a sendwich');
console.log(helloNet.run(stringToBit('can you make me a sendwich')));

console.log('\nwhere are you going later');
console.log(helloNet.run(stringToBit('where are you going later')));
