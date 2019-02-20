'use strict';

const fs = require('fs');

const FILE_NAME = 'test.json';
const ARRAY_LENGTH = 10;
const TRAINING_INPUTS = 10000;

fs.appendFileSync(FILE_NAME, '[\n');

for (let i = 0; i < TRAINING_INPUTS - 1; i += 1) {
  // randomly generated N = ARRAY_LENGTH length array where 0 <= A[N] <= 1
  const input = Array.from({ length: ARRAY_LENGTH - 1 }, () => Math.random());
  input.push(i % 2);
  fs.appendFileSync(FILE_NAME, `  { "input": [${input}], "output": [${i % 2}] },\n`);
}

// last without ','
const input = Array.from({ length: ARRAY_LENGTH - 1 }, () => Math.random());
input.push(1);
fs.appendFileSync(FILE_NAME, `  { "input": [${input}], "output": [1] }\n`);

fs.appendFileSync(FILE_NAME, ']');
