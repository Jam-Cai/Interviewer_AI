// server.js - Main cluster file
const cluster = require('cluster');
const os = require('os');
const path = require('path');

// Determine number of CPUs for worker creation
const numCPUs = os.cpus().length;

// Cluster manager process
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  console.log(`Setting up ${numCPUs} workers...`);

  // Fork workers equal to CPU count
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
    // Restart the worker
    cluster.fork();
  });

  // Optional: Graceful reload capabilities
  process.on('SIGUSR2', () => {
    console.log('Reloading application...');
    
    const workers = Object.values(cluster.workers);
    let restartedWorkers = 0;
    
    // Restart workers one by one
    const restartWorker = (workerIndex) => {
      if (workerIndex >= workers.length) return;
      
      const worker = workers[workerIndex];
      console.log(`Restarting worker ${worker.process.pid}`);
      
      // Create new worker
      const newWorker = cluster.fork();
      
      // Once the new worker is listening, kill the old one
      newWorker.on('listening', () => {
        worker.disconnect();
        restartedWorkers++;
        
        if (restartedWorkers < workers.length) {
          restartWorker(restartedWorkers);
        }
      });
    };
    
    restartWorker(0);
  });

} else {
  // Worker process - run the actual server
  require('./worker');
  console.log(`Worker ${process.pid} started`);
}