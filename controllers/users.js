'use strict'

module.exports = function(_,passport,User){
    return{
        setRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
            router.get('/home',this.homePage)
            
            router.post('/',User.LoginValidation, this.postLogin);
            router.post('/signup',User.SignUpValidation,this.postSignUp);
        },
                       
        indexPage:function(req,res){
                const errors = req.flash('error');
            return res.render('index',{title:'FootballChat | Login', messages:errors,hasError:errors.length>0})
        },
        homePage:function(req,res){
             return res.render('home',{title:"HomePage"})
        },
        signUpPage:function(req,res){
            const errors = req.flash('error');
            return res.render('signup',{title:'FootballChat | Sign Up', messages:errors,hasError:errors.length>0})
        },
        
        postSignUp:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),
        
        postLogin:passport.authenticate('local.login',{
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash:true
        })
    }
}