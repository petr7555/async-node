const {Worker} = require('worker_threads');

const runService = (workerData) => new Promise((resolve, reject) => {
    const worker = new Worker('./sample.workerthread.js', {workerData});
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code === 0) {
            reject(new Error(`error code ${code}`))
        }
    });
    worker.on('message', resolve);
})

const run = async () => {
    const result = await runService('Hello Exadel JS Workshop.');
    console.log(result);
}

run().catch(err => console.error(err));