var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

socket.on('connect', function () {
    console.log('Connected to socket.io server.');
});

// Front end listen for message (callback)
socket.on('message', function (message) {
    var momentTimeStamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');
    console.log('New message:');
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm a') + '</strong></p>')
    $message.append('<p>' + message.text + '</p>')
});

// Handle submitting new messages
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault(); // Don't submit by refreshing the entire page
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $message.val()
    });
    $message.val(''); // Used to clear text box after sending message
});