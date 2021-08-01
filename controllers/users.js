'use strict'

module.exports = function(_,passport,User){
    return{
        setRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
            router.get('/home',this.homePage)
            
            
            router.post('/signup',User.SignUpValidation,this.postSignUp);
        },
                       
        indexPage:function(req,res){
                return res.render('index',{title:"Index Page"})
        },
        homePage:function(req,res){
             return res.render('home',{title:"HomePage"})
        },
        signUpPage:function(req,res){
            const errors = req.flash('error')
            return res.render('signup',{title:'FootballChat | Login', messages:errors,hasError:errors.length>0})
        },
        
        postSignUp:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        })
    }
}