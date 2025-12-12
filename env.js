const dotenv = require("dotenv");
const path = require("path");

const config = dotenv.config({
    path: path.resolve(__dirname, ".env"),
    debug: false,
    encoding: "utf8",
    quiet: false
});

module.exports = config;


