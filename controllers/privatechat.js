module.exports = function(async,Users){
    return{
        setRouting:function(router){
            router.get('/chat/:name', this.getChatPage)
        },
        
        getChatPage:function(req,res){
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
                
                res.render('private/privatechat',{title:'FootballChat - Private Chat', user:req.user,data:result1});
               });
        }
    }
}