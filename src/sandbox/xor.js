'use strict';

const brain = require('brain.js');

const orNet = new brain.NeuralNetwork();

// Logic OR training
orNet.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [1] },
]);

const OR = (a, b) => orNet.run([a, b]);

console.log(`0 OR 0 => ${OR(0, 0)}`);
console.log(`1 OR 0 => ${OR(1, 0)}`);
console.log(`0 OR 1 => ${OR(0, 1)}`);
console.log(`1 OR 1 => ${OR(1, 1)}`);
