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
        console.log(friend)
    })
})