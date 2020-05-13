var PORT = process.env.PORT || 3000; // Let host choose port, else use 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

// Starting the server
http.listen(PORT, function () {
    console.log('Server started on port ' + PORT);
});