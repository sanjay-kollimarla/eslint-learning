const { ServerManager } = require("./server");

const server = new ServerManager();
server.start();

process.on('SIGINT', server.shutdown);
process.on('SIGTERM', server.shutdown);
