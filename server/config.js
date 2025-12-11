const serverConfig = {
    onShutdown: (server) => {
        console.log('Shutting down: stop accepting new connections');
        server.close(() => {
            console.log('All connections closed. Exit.');
            process.exit(0);
        });
    }
};

module.exports = serverConfig;