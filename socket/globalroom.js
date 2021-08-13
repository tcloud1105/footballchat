module.exports = function(io, Global, _){
    const clients = new Global();
    
    io.on('connection',(socket)=>{
        socket.on('global room', (global)=>{
            socket.join(global.room);
            
            clients.enterRoom(socket.id, global.room, global.room, global.img)
            
            var nameProp = clients.getRoomList(global.room)
            const arr = _.uniqBy(nameProp,'name');
            
            io.to(global.room).emit('loggedInUser',arr)
        })
        
        socket.on('disconnect', ()=>{
            var client = clients.removeUser(socket.id);
            
            if(client){
                var userData = clients.getRoomList(client.room);
                const arr = _.uniqBy(userData,'name');
                const removeData = _.remove(arr, {'name':client.name})
                io.to(client.room).emit('loggedInUser',arr)
            }
        })
    })
}