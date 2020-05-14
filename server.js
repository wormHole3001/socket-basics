var PORT = process.env.PORT || 3000; // Let host choose port, else use 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    // Used to check if client connected via socket.io
    console.log('User connected via socket.io!');
    
    socket.on('message', function (message) {
        console.log('Message Received: ' + message.text);
        
        io.emit('message', message); // send message to everyone connected
    });
    // Greeting for the user once they are connected via socket.
    socket.emit('message', {
        text: 'Welcome to the chat application'
    });
})

// Starting the server
http.listen(PORT, function () {
    console.log('Server started on port ' + PORT);
});