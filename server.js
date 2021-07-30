const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const container = require('./container');

container.resolve(function(users){
   const app = setUpExpress(); 
    
    
    function setUpExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log("Listening on port 3000");
        })   
        
        configureExpress(app);
        
        //Setup Router
        const router = require('express-promise-router')();
        users.setRouting(router);
    
        app.use(router);
    }
    
    
    
    function configureExpress(app){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:true}));
    }
});



