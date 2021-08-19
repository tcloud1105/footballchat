module.exports = function(){
    return{
        setRouting:function(router){
            router.get('/settings/profile', this.getProfilePage)
        },
        
        getProfilePage: function(req,res){
            res.render("user/profile", {title:'FootballChat-Profile', user:req.user})
        }
    }
}