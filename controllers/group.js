module.exports = function(Users, async){
    return{
        setRouting:function(router){
           router.get('/group/:name', this.groupPage);
           router.post('/group/:name', this.groupPostPage)
        },
        
        groupPage:function(req,res){
            const name = req.params.name;
            
            async.parallel([
                function(callback){
                    Users.findOne({'username':req.user.username})
                         .populate('request.userId')
                         .exec((err, result)=>{
                             callback(err,result)
                          })
                       }
               ],(err,results)=>{
                 const result1 = results[0];
                
                res.render('groupChat/group',{title:"Football-Chat", user:req.user,groupName:name, data:result1});
               });
        },
        
        groupPostPage: function(req,res){
            async.parallel([
                function(callback){
                    if(req.body.receiverName){
                        Users.update({
                            'username':req.body.receiverName,
                            'request.userId':{$ne: req.user._id},
                            'friendsList.friendId': {$ne: req.user._id}
                        },{
                            $push:{request:{
                                userId: req.user._id,
                                username: req.user.username
                            }},
                            $inc: {totalRequest: 1}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    }
                },
                 function(callback){
                    if(req.body.receiverName){
                        Users.update({
                            'username':req.user.username,
                            'sendRequest.username':{$ne: req.body.receiverName}
                        },{
                            $push:{sendRequest:{
                                username: req.user.receiverName
                            }}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    }
                }
            ], (err, results)=>{
                res.redirect('/group/'+req.params.name)
            });
            
            async.parallel([
                function(callback){
                    if(req.body.senderId){
                        Users.update({
                            '_id':req.user._id,
                            'friendsList.friendId':{$ne: req.body.senderId}
                        },{
                            $push:{friendsList:{
                                friendId: req.body.senderId,
                                friendName:req.body.senderName
                            }},
                            $pull:{request:{
                               userId: req.body.senderId,
                                username: req.body.username
                            }},
                            $inc:{totalRequest: -1}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    },
                        
                  function(callback){
                    if(req.body.senderId){
                        Users.update({
                            '_id':req.body.senderId,
                            'friendsList.friendId':{$ne: req.user._id}
                        },{
                            $push:{friendsList:{
                                friendId: req.body.senderId,
                                friendName:req.user.username
                            }},
                            $pull:{sentRequest:{
                                username: req.user.username
                            }}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    }
                },
                 function(callback){
                    if(req.body.user_Id){
                        Users.update({
                            '_id':req.user._id,
                            'request.userId':{$eq:req.body.user_Id}
                        },{
                            $pull:{request:{
                                userId: req.body.user_id
                            }},
                            $pull:{sentRequest:{
                                username: req.user.username
                            }},
                            $inc:{totalRequest: -1}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    }
                },   
                function(callback){
                    if(req.body.user_Id){
                        Users.update({
                            '_id':req.body.user_Id,
                            'sendRequest.username':{$eq:req.user.username}
                        },{
                            $pull:{sendRequest:{
                                username: req.user.username
                            }}
                        }, (err, count)=>{
                            callback(err,count);
                        })
                    }
                }
                   
            ], (err, results)=>{
                res.redirect('/group/'+req.params.name)
            });
        }
    }
    
}