

class Users {
    constructor(){
        this.globalRoom = [];
    }
    
    enterRoom(id,name,room,img){
        var roomName = {id,name,room,img}
        this.globalRoom.push(roomName)
        return roomName;
    }
    
    getUserId(id){
        var getUser = this.users.filter((users)=>{
            return users.id == id;
        })[0];
        
        return getUser;
    }
    
    removeUser(id){
       var user = this.getUserId(id);
        if(user){
            this.users = this.users.filter((user)=> user.id!=id)
        }
        
        return user;
    }
    
    getRoomList(room){
       var roomName = this.globalRoom.filter((user)=>{
            return user.room===room
        })
       
       var namesArray = users.map(function(user){
           return {
               name:user.name,
               img:user.img
           };
       })
       
       return namesArray;
    }
}

module.exports = {Global}