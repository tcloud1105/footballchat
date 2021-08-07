module.exports = function(formidable, Club){
    return{
        setRouting:function(router){
           router.get('/group/:name', this.groupPage);
        },
        
        groupPage:function(req,res){
            const name = req.params.name;
            res.render('groupChat/group',{title:"Football-Chat", name:name});
        }
    }
    
}