'use strict'

module.exports = function(_,passport,User,validator){
    return{
        setRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
            router.get('/home',this.homePage);
            router.get('/auth/facebook',this.getFacebookLogin);
            router.get('/auth/facebook/callback',this.facebookLogin)
            
           // router.post('/',User.LoginValidation, this.postLogin);
            //router.post('/signup',User.SignUpValidation,this.postSignUp);
            router.post('/',[
                 validator.check('email').not().isEmpty().isEmail().withMessage('Email is required.'),
                  validator.check('password').not().isEmpty().isLength({min:8}).withMessage('Password is required and must at least 8 characters.')
             ],this.postValidation,this.postSignUp);
             router.post('/signup',[
                 validator.check('username').not().isEmpty().isLength({min:5}).withMessage('Username is required and must at least 5 characters.'),
                 validator.check('email').not().isEmpty().isEmail().withMessage('Email is required.'),
                  validator.check('password').not().isEmpty().isLength({min:8}).withMessage('Password is required and must at least 8 characters.')
             ],this.postValidation,this.postSignUp);
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
        }),
        
        getFacebookLogin:passport.authenticate('facebook',{
            scope:'email'
        }),
        facebookLogin:passport.authenticate('facebook',{
           successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),
        
        postValidation:function(req,res,next){
            const err = validator.validationResult(req);
            const errors = err.array();
                const messages = [];
                errors.forEach((error)=>{
                    messages.push(error.msg);
                });
            
                if(messages.length>0){
                    req.flash('error',messages);
                    if(req.url==="/signup"){
                         res.redirect('/signup');
                    }else if(req.url==='/'){
                        res.redirect('/');
                    }
                }
            return next();
                
        }
    }
}