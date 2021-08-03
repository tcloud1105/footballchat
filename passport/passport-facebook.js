'use strict'
const passport = require('passport');
const User = require("../models/user");
const secret = require('../secret/secretFile');
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});

passport.use(new FacebookStrategy({
   clientID:secret.facebook.clientID,
    clientSecret:secret.facebook.secretID,
    profileFields:['email','displayName','photos'],
    callbackUrl:'http://localhost:3000/auth/facebook/callback',
    passRequestToCallback:true
}, (req,token,refreshToken,profile,done)=>{
    
      User.findOne({facebook:profile.id}, (err,user)=>{
          if(err){
              return done(err);
          }
          
          if(user){
              return done(null,user);
          }else{
              const newUser = new User();
             newUser.facebook = profile.id;
              newUser.fullname = profile.displayName;
              newUser.email = profile._json.email;
              newUser.uerImage = 'https://graph.facebook.com/'+profile.id+'/picture?type=large';
              newUser.fbTokens.push({token:token});
          
          newUser.save((err)=>{
             return  done(null,user)
          });
          }
          
      })
    
}));  
            


