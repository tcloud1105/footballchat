module.exports = function(io){
    io.on('connection', (socket)=>{
        console.log("User connected")
        
        socket.on('join',(params, callback)=>{
            socket.join(params.room);
            callback();
        })
        
        socket.on("createMessage", (data, callback)=>{
            console.log(data);
            io.to(data.room).emit("newMessage", {
                text:data.text,
                room:data.room
            })
            
            callback();
        })
    })
}