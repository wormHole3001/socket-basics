var PORT = process.env.PORT || 3000; // Let host choose port, else use 3000
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
    // Used to check if client connected via socket.io
    console.log('User connected via socket.io!');

    // End user disconnects
    socket.on('disconnect', function () {
        var userData = clientInfo[socket.id];
        // Check if user is part of a room
        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment.valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    // End user joins room
    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment.valueOf()
        });
    });
    
    socket.on('message', function (message) {
        console.log('Message Received: ' + message.text);

        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message); // send message to everyone connected in the same room
    });

    // Greeting for the user once they are connected via socket.
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application',
        timestamp: moment().valueOf()
    });
})

// Starting the server
http.listen(PORT, function () {
    console.log('Server started on port ' + PORT);
});