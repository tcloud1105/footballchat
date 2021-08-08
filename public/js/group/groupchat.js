$(document).ready(function(){
    var socket = io();
    socket.on('connect', function(){
        console.log('Yeah! User connected');
    })
    
    
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        var msg = $('#msg').val();
    
        socket.emit("createMessage", {
            text:msg
        })
        
    })
})