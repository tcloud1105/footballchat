module.exports = function(async, Club, _){
    return{
        setRouting:function(router){
            router.get('/home',this.homePage);
        },
        
        homePage:function(req,res){
             return res.render('home',{title:"HomePage"})
        }
    }
}