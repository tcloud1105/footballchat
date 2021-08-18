$(document).ready(function(){
    var socket = io();
    
    var sender = $("#sender").val();
    var room = $("#groupName").val();
    socket.on('connect', function(){
        console.log('Yeah! User connected');
        
        var params ={
            room:room,
            name:sender
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel');
        });
    })
    
    socket.on('usersList', function(users){
        var ol = $('<ol></ol>');
        
        for(var i=0; i<=users.length;i++){
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'</a></p>');
        }
        
        //event delegation
        $(document).on('click','#val',function(){
            $('#name').text('@'+$(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr('href','/profile/'+$(this).text());
        })
        
        $('#numValue').text('('+users.length+')');
        $('#users').html(ol);
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
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST', 
            data:{
                message:msg,
                group:room
            },
            success:function(){
                $('#msg').val('');
            }
        })
        
    })
    
    socket.on("newMessage", function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text:data.text,
            sender:data.from,
        })
        $('#messages').append(message)
    })
})