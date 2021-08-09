class Users {
    constructor(){
        this.users = [];
    }
    
    addUserData(id,name,room){
        var user = {id,name,room}
        this.users.push(user)
        return user;
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
    
    getUsersList(room){
       var users = this.users.filter((user)=>{
            return user.room===room
        })
       
       var namesArray = users.map(function(user){
           return user.name;
       })
       
       return namesArray;
    }
}

module.exports = {Users}