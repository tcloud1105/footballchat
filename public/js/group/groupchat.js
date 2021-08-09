$(document).ready(function(){
    var socket = io();
    
    var sender = $("#sender").val();
    var room = $("#groupName").val();
    socket.on('connect', function(){
        console.log('Yeah! User connected');
        
        var params ={
            room:room
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel');
        });
    })
    
    
    $('#message-form').on('submit', function(e){
        e.preventDefault();
        var msg = $('#msg').val();
    
        socket.emit("createMessage", {
            text:msg,
            room:room,
            from:sender
        }, function(){
            $('#msg').val('');
        })
        
    })
    
    socket.on("newMessage", function(data){
        console.log(data);
    })
})