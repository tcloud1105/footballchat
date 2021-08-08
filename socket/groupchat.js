module.exports = function(io){
    io.on('connection', (socket)=>{
        console.log("User connected")
        
        socket.on("createMessage", (data)=>{
            console.log(data);
        })
    })
}