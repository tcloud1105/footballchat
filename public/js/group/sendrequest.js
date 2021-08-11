$(document).ready(function(){
    var socket = io();
    var sender = $("#sender").val();
    var room = $("#groupName").val();
    
    socket.on('connect', function(){
        var params = {
            sender: sender
        }
        
        socket.emit("joinRequest", params, function(){
            console.log('joined')
        })
        
        $('#add_friend').on('submit', function(e){
            e.preventDefault();
            
            var receiverName = $('#receiverName').val();
            
            $.ajax({
                url: "/group/"+room,
                type: "POST",
                data:{
                    receiverName:receiverName,
                }, 
                
                success:function(){
                    socket('friendRequest',{
                       receiver:receiverName,
                        sender:sender
                    }, function(){
                        console.log("Request Sent")
                    })
                }
            })
        })
    })
    
    socket.on("newFriendRequest", function(friend){
        $('#reload').load(location.href+' #reload');
        
    $(document).on('click','#accept_friend',function(e){
        
        var senderId = $('#senderId').val();
        var senderName = $('#senderName').val();
        
        $.ajax({
            url:'/group/'+room,
            type:'POST',
            data:{
                senderId:senderId,
                senderName:senderName
            },
            success:function(data){
                $(this).parent().eq(1).remove();
                
            }
        })
        $('#reload').load(location.href+' #reload');
    })
        
    $(document).on('click','#cancel_friend',function(e){
        
        var user_Id = $('#user_Id').val();
        
        $.ajax({
            url:'/group/'+room,
            type:'POST',
            data:{
                user_Id:user_Id
            },
            success:function(data){
                $(this).parent().eq(1).remove();
                
            }
        })
        $('#reload').load(location.href+' #reload');
    })
    })
    
    
    $('#accept_friend').on('click', function(){
        var senderId = $('#senderId').val();
        var senderName = $('#senderName').val();
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });
    
    $('#cancel_friend').on('click', function(){
        var user_Id = $('#user_Id').val();
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                user_Id: user_Id
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });
   
})