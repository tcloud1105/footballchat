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
        
        socket.on('new refresh', ()=>{
            $('#reload').load(location.href+' #reload');
        })
        
        socket.on('message display', function(){
            $('#reload').load(location.href+' #reload');
        })
    })
    
    $(document).on('click','#messageLink', function(){
        var chatId = $(this).data('value');
        
        $.ajax({
            uel:'/chat/'+paramOne,
            type: 'POST',
            data:{chatId:chatId},
            success:function(){
                
            }
        })
       
        socket.emit('refresh', {})
       
    })
})


function swap(input, index1, index2){
    var temp = input[index1]
    input[index1] = input[index2]
    input[index2] = temp
}