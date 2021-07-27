import { Worker } from "./worker";
console.log("Starting worker");
const worker = new Worker();
setInterval(async () => {
  console.log("Running probably");
  worker.start();
}, 3000);


