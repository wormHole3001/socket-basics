var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server.');
});

// Front end listen for message
socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);
});

// Handle submitting new messages
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault(); // Don't submit by refreshing the entire page
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });
    $message.val(''); // Used to clear text box after sending message
});