const { workerData, parentPort } = require('worker_threads');

const { a, b } = workerData;
const result = a + b;

// a)
// throw new Error('bad stuff');

// b)
// process.exit(123);

// c)
parentPort.postMessage({ message: result });
