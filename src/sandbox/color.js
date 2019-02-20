'use strict';

const brain = require('brain.js');

const colorNet = new brain.NeuralNetwork({
  // binaryThresh: 0.5,
  // hiddenLayers: [], // array of ints for the sizes of the hidden layers in the network
  // activation: 'relu', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  // leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
});

colorNet.train([
  { input: { r: 1, g: 0, b: 0 }, output: { red: 1 } },
  { input: { r: 0, g: 1, b: 0 }, output: { green: 1 } },
  { input: { r: 0, g: 0, b: 1 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 0 }, output: { yellow: 1 } },
  { input: { r: 1, g: 0, b: 1 }, output: { purple: 1 } },
  { input: { r: 0, g: 1, b: 1 }, output: { lightBlue: 1 } },
  { input: { r: 0, g: 0, b: 0 }, output: { black: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } },
],
{
  errorThresh: 0.05, // error threshold to reach
  iterations: 50000, // maximum training iterations
  log: true, // console.log() progress periodically
  logPeriod: 10, // number of iterations between logging
  learningRate: 0.3, // learning rate
});

const getColorFromRGB = (r, g, b) => {
  const start = process.hrtime.bigint();
  const result = colorNet.run({ r, g, b });
  console.log(process.hrtime.bigint() - start);
  const max = Math.max(...Object.values(result));
  // console.log(result);
  // console.log(max);
  return Object.keys(result).filter(key => result[key] === max)[0];
};

console.log(`{ r: 1, g: 0.4, b: 0 } => ${getColorFromRGB(1, 0.4, 0)}`);
console.log(`{ r: 0.01, g: 0.6, b: 0.5 } => ${getColorFromRGB(0.01, 0.6, 0.5)}`);
console.log(`{ r: 0.01, g: 0.6, b: 0.5 } => ${getColorFromRGB(0.5, 0.5, 0.5)}`);
