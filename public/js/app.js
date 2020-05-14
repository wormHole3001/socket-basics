var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server.');
});

// Front end listen for message
socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);
});