'use strict'

module.exports = function(_){
    return{
        setRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
        },
                       
        indexPage:function(req,res){
                return res.render('index',{title:"HomePage"})
        },
        signUpPage:function(req,res){
            return res.render('signup',{title:'Sign Up'})
        }
    }
}