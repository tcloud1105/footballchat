module.exports = function(async, Club){
    return {
        setRouting:function(router){
            router.get('/results', this.getResults)
            router.post('/results', this.postResults)
        },
        
        getResults:function(req,res){
            res.render('results', {user: req.user});
        },
        
        postResults:function(req,res){
            async.parallel([
                const regex = new RegExp((req.body.country),'gi');
                
                Club.find({'$or':[{'country':regex},{'name':regex}]}, (err, result)=>{
                  callback(err, result)
                })
            ], (err, results)=>{
                const res1 = results[0];
                
                const dataChunk = [];
                const chunkSize =3;
                 for(let i=0;i<res1.length;i+=chunkSize){
                      dataChunk.push(res1.slice(i,i+chunkSize)); 
                  }
                  const countrySort = _.sortBy(res2, '_id');
                  res.render('results',{title:"Footballchat - Result",chunks:dataChunk, countries:countrySort, user:req.user})
            })
        },
    }
}