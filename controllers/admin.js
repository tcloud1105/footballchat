'use strict'
const path = require('path');
const fs = require('fs');

module.exports = function(formidable){
    return{
        setRouting:function(router){
            router.get('/dashboard',this.adminPage);
            
            
            router.post('/uploadFile', this.uploadFile)
        },
        
        adminPage:function(req,res){
            res.render('admin/dashboard',{title:'Admin DashBoard'})
        },
        uploadFile:function(req,res){
            const form = formidable.IncomingForm();
            form.uploadDir = path.join(__dirname,'../public/uploads');
            form.on('file',(field, file)=>{
                console.log(field);
                console.log(file);
            })
        }
    }
}