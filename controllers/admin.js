'use strict'

module.exports = function(){
    return{
        setRouting:function(router){
            router.get('/dashboard',this.adminPage);
        },
        
        adminPage:function(req,res){
            res.render('admin/dashboard',{title:'Admin DashBoard'})
        }
    }
}