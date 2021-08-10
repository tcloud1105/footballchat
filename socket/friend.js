module.exports = function(io){
   
    io.on('connect', (socket)=>{
        socket.on('joinRequest', (myRequest, callback)=>{
            socket.join(myRequest.sender);
            
            callback();
        })
        
        socket.on('friendRequest', (friend, callback)=>{
            io.to(friend.receiver).emit('newFriendRequest', {
                from: friend.sender,
                to: friend.receiver
            });
            
            callback();
        })
    })
}