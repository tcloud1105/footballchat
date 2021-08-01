'use strict'

module.exports = function(_,passport){
    return{
        setRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
            router.get('/home',this.homePage)
            
            
            router.post('/signup',this.postSignUp);
        },
                       
        indexPage:function(req,res){
                return res.render('index',{title:"Index Page"})
        },
        homePage:function(req,res){
             return res.render('home',{title:"HomePage"})
        },
        signUpPage:function(req,res){
            return res.render('signup',{title:'Sign Up'})
        },
        
        postSignUp:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        })
    }
}