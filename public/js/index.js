var socket = io();

function scrollToBottom(){

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight*20 >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {

     var timestamp = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message_template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: timestamp
    });
    // console.log('New message emmitted', message);
    // var li = jQuery('<li></li>');   
    // li.text(`${message.from} ${timestamp}: ${message.text}`);

    jQuery('#messages').append(html);
    scrollToBottom();
});

var messageTextbox = jQuery('[name=message]');


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});


var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        locationButton.removeAttr('disabled').text('Send Location');
    
    }, function(){
        locationButton.removeAttr('disabled').text('Send Location');        
        alert('Unable to fetch location');
    });
});


socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var timestamp = moment(message.createdAt).format('hh:mm a');
    var a = jQuery('<a target="_blank">My current Location</a>');

    li.text(`${message.from} ${timestamp} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
    scrollToBottom();
});
