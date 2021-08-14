module.exports = function(io){
    
    io.on('connection', (socket)=>{
        
        socket.on('join PM', (params)=>{
            socket.join(pm.room1);
            socket.join(pm.room2);
        })
        
        socket.on('privateMessage', (message)=>{
            
        })
    })
}