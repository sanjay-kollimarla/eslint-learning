require("../env");
const http = require("http");

const app = require('../app');
const { onShutdown } = require("./config");

const { PORT } = process.env;

class ServerManager {
    constructor() {
        this.app = app;
        this.server = null;
        this.isShuttingDown = false;
        this.connections = new Set();
    }

    start() {
        this.server = http.createServer(this.app);

        // Track sockets so we can close them on shutdown
        this.server.on("connection", (socket) => {
            this.connections.add(socket);
            socket.on("close", () => this.connections.delete(socket));
        });

        this.server.listen(PORT, (err) => {
            if (err) {
                console.error(`Error initializing server:\n${err}\n`);
                return;
            }
            console.log(`Server listening on port: ${PORT}`);
        });

        process.on('SIGINT', this.shutdown);
    }

    shutdown() {
        if (this.isShuttingDown) return;
        this.isShuttingDown = true;
        onShutdown(this.server);
    }
}

module.exports = { ServerManager };
