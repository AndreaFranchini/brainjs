'use strict';

// https://github.com/BrainJS/brain.js/blob/master/examples/stream-example.js

const brain = require('brain.js');

const trainingData = require('./train/test');

function readInputs(stream, data) {
  for (let i = 0; i < data.length; i += 1) {
    stream.write(data[i]);
  }
  // let it know we've reached the end of the inputs
  stream.endInputs();
}

// Nodejs compatibility will land around the first month of 2019.
// const jarvis = new brain.NeuralNetworkGPU({
const jarvis = new brain.NeuralNetwork({
  // binaryThresh: 0.5,
  // hiddenLayers: [64, 32, 16], // array of ints for the sizes of the hidden layers in the network
  // activation: 'relu', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  // leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
});

const trainStream = new brain.TrainStream({
  neuralNetwork: jarvis,
  errorThresh: 0.005, // error threshold to reach
  iterations: 20000, // maximum training iterations
  log: true, // console.log() progress periodically
  logPeriod: 1, // number of iterations between logging
  learningRate: 0.6, // learning rate
  /**
   * Write training data to the stream. Called on each training iteration.
   */
  floodCallback: () => {
    readInputs(trainStream, trainingData);
  },
  /**
   * Called when the network is done training.
   */
  doneTrainingCallback: (obj) => {
    console.log(`Jarvis trained in ${obj.iterations} iterations with error: ${obj.error}`);

    const input = Array.from({ length: 10 }, () => Math.random());
    console.log(`input ${input} => ${jarvis.run(input)}`);
  },
});

// kick it of
readInputs(trainStream, trainingData);
