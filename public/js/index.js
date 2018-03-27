var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    //  socket.emit('createMessage', {
    //      text: 'wassupppp?',
    //      from: 'milind',
    //  });
 
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message emmitted', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Milind',
//     text: 'data from client'
// }, function(data){
//     console.log('Got it', data);
// });


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

