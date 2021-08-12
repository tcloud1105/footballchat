const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');
const {Users} = require('./helpers/UserClass')
const {Global} = require('./helpers/Global')

const container = require('./container');

container.resolve(function(users,_,admin,home, group){
    mongoose.Promise = global.Promise;
   mongoose.connect('mongodb://localhost:27017/footballchat',{useNewUrlParser:true});
    //mongoose.connect('mongodb://localhost:27017/footballchat',{useMongoClient:true});
    
   const app = setUpExpress(); 
    
    
    function setUpExpress(){
        const app = express();
        const server = http.createServer(app);
        const io = socketIO(server);
        server.listen(3000, function(){
            console.log("Listening on port 3000");
        })   
        
        configureExpress(app);
        require('./socket/groupchat')(io,Users);
        require('./socket/friend')(io);
        require('./socket/globalroom')(io, Global);
        
        //Setup Router
        const router = require('express-promise-router')();
        users.setRouting(router);
        admin.setRouting(router);
        home.setRouting(router);
        group.setRouting(router);
    
        app.use(router);
        
        
    }
    
    
    
    function configureExpress(app){
        require('./passport/passport-local')
        require('./passport/passport-facebook')
        require('./passport/passport-google')
        
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}));
        
        
        app.use(session({
            secret:'thisisasecretkey',
            resave:true,
            saveInitialized:true,
            store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/footballchat' })
        }))
        
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        
        app.locals._ = _ // allow the lodash to be use golbally in the project
    }
});



