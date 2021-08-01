'use strict'
const passport = require('passport');
const User = require("../models/user")
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user,done)=>{
    done(null,user.id)
})