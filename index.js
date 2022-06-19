const { Worker } = require('worker_threads');

const runService = (id, workerData) => new Promise((resolve, reject) => {
    const worker = new Worker('./sample.workerthread.js', { workerData });

    // when worker throws an uncaught exception
    // exit code is 1
    worker.on('error', e => reject(`Worker threw an error: ${e.message}`));

    // when worker calls `process.exit(code)` or when it stops
    worker.on('exit', (code) => {
        console.log(`Worker ${id}: Exit event, code ${code}.`);
        if (code !== 0) {
            reject(new Error(`Return code is ${code}`))
        }
    });

    // when worker calls `parentPort.postMessage()`
    worker.on('message', resolve);
})

const run = async () => {
    const result1 = await runService(1, { a: 2, b: 5 });
    const result2 = await runService(2, { a: 3, b: 8 });
    console.log(result1);
    console.log(result2);
}

run().catch(err => console.error(err));
