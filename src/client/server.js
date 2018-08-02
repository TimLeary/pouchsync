const connect = require('connect');
const serveStatic = require('serve-static');
const port = 8080;

connect()
    .use(serveStatic(__dirname+"/dist"))
    .listen(port, () => {
        console.log("Server running on "+port)
    });