module.exports = function(io){
    
    io.on('connection', (socket)=>{
        
        socket.on('join PM', (params)=>{
            socket.join(pm.room1);
            socket.join(pm.room2);
        })
        
        socket.on('privateMessage', (message, callback)=>{
            io.to(message.room).emit('new message', {
                text: message.text,
                sender: message.se
            });
            
            io.emit('message display',{});
            callback()
        })
    })
}