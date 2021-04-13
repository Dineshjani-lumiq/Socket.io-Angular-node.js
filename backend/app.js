var express = require('express');
var socket = require('socket.io');
var app = express();
const server = require('http').createServer();


const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        transports: ['websocket', 'polling'],

        credentials: true,
        serveClient: true
    },
            allowEIO3: true,

});




// Socket setup


app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Listen for new connection and print a message in console 
io.on('connection', (socket) => {

    console.log(`New connection ${socket.id}`)

    // Listening for chat event
    socket.on('chat', function (data) {
        // console.log('chat event trigged at server');
        // console.log('need to notify all the clients about this event');
        io.sockets.emit('chat', data);
    });

    // Listening for typing event
    socket.on('typing', function (data) {
        // console.log(`Server received ${data} is typing`);
        // console.log('need to inform all the clients about this');
        io.sockets.emit('typing', data);
        //socket.broadcast.emit('typing', data);
    });

});
server.listen(3009);