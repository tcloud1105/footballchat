module.exports = function(async, Users, Message, FriendResult){
    return{
        setRouting:function(router){
            router.get('/settings/interests', this.getInterestPage);
            
            router.post('/settings/interests', this.postInterestPage)
        },
        postInterestPage: function(req,res){
             FriendResult.PostRequest(req, res,'/settings/interests');
            
            async.parallel([
                function(callback){
                   if(req.body.favClub){
                        Users.update({
                            '_id': req.user._id,
                            'favClub.clubName': {$ne: req.body.favClub}
                        },{
                            $push: {favClub: {
                                clubName: req.body.favClub
                            }}
                        }, (err, result1)=>{
                            callback(err,result1)
                        })
                   }
                   
                },
                
               
            ], (err, results)=>{
                res.redirect('/settings/interests')
            });
            
            async.parallel([
                function(callback){
                   if(req.body.favPlayer){
                        Users.update({
                            '_id': req.user._id,
                            'favPlayer.playerName': {$ne: req.body.favClub}
                        },{
                            $push: {favPlayer: {
                                playerName: req.body.favPlayer
                            }}
                        }, (err, result2)=>{
                            callback(err,result2)
                        })
                   }
                   
                }  
               
            ], (err, results)=>{
                res.redirect('/settings/interests')
            });
            
            async.parallel([
                function(callback){
                   if(req.body.favTeam){
                        Users.update({
                            '_id': req.user._id,
                            'favNationalTeam.teamName': {$ne: req.body.favTeam}
                        },{
                            $push: {favNationalTeam: {
                                teanName: req.body.favTeam
                            }}
                        }, (err, result3)=>{
                            callback(err,result3)
                        })
                   }
                   
                }  
               
            ], (err, results)=>{
                res.redirect('/settings/interests')
            });
        },
         
        getInterestPage: function(req,res){
             async.parallel([
                function(callback){
                    Users.findOne({'username':req.user.username})
                         .populate('request.userId')
                         .exec((err, result)=>{
                             callback(err,result)
                          })
                       },
                function(callback){
                    const nameRegex = new RegExp("^" + req.user.username.toLowerCase(), "i")
                    Message.aggregate(
                        {$match:{$or:[{"senderName":nameRegex}, {"receiverName":nameRegex}]}},
                        {$sort:{"createdAt":-1}},
                        {
                            $group:{"_id":{
                            "last_message_between":{
                                $cond:[
                                    {
                                        $gt:[
                                        {$substr:["$senderName",0,1]},
                                        {$substr:["$receiverName",0,1]}]
                                    },
                                    {$concat:["$senderName"," and ","$receiverName"]},
                                    {$concat:["$receiverName"," and ","$senderName"]}
                                ]
                            }
                            }, "body": {$first:"$$ROOT"}
                            }
                        }, function(err, newResult){
                            const arr = [
                                {path: 'body.sender', model: 'User'},
                                {path: 'body.receiver', model: 'User'}
                            ];
                            
                            Message.populate(newResult, arr, (err, newResult1) => {
                                callback(err, newResult1);
                            });
                        }
                    )
                }
               ],(err,results)=>{
                 const result1 = results[0];
                const result2 = results[1];
                
                res.render('user/profile',{title:"Football-Profile", user:req.user,data:result1, chat:result2});
               });
        }
    }
}