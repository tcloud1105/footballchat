$(document).ready(function(){
    var socket = io();
    
    var paramOne = $.param(window.location.pathname);
    var newParam = paramOne.split('.')
    
    var username = newParam[0];
    $('#reveiver_name').text('@'+username);
    swap(newParam,0,1);
    var paramTwo = newParam[0]+'.'+newParam[1]
    
    socket.on('connect', function(){
        var params = {
            room1: paramOne,
            room2: paramTwo
        }
        
        socket.emit('join PM', params)
    })
    
     $('#message_form').on('submit', function(e){
        e.preventDefault();
        var msg = $('#msg').val();
         var sender = $('#name-user').val()
    
        if(msg.trim().length >0){
          socket.emit("privateMessage", {
            text:msg,
            sender:sender
        }, function(){
            $('#msg').val('');
        })   
        }
        
    })
    
    $('#send-message').on('click', function(){
        var message = $('#msg').val();
        
        
        $.ajax({
            url:'/chat/'+paramOne,
            type: 'POST',
            data:{
                message: message
            },
            
            success:function(){
                $('#msg').val('');
            }
        })
    })
})

function swap(input, index1, index2){
    var temp = input[index1]
    input[index1] = input[index2]
    input[index2] = temp
}