$(document).ready(function(){
    return GetResult()
})

function GetResult(){
    $.ajax({
        url:"https://content.guardianapis.com/football?page-size=10&order-by=newest&show-fields=all&api-key=462f104e-dda3-49b4-845e-e0626b5b99ee",
        type:"GET",
        dataType:'json',
        success:function(data){
            var results ='';
            $.each(data.response.results, function(i){
               results += '<form class="paginate">';
                results += '<div class="col-md-12 news-post">';
                results += '<div class="row">';
                
                results += '<a href='+data.response.results[i].webUrl+' target="_blank" style="color:#4aa1f3; text-decoration:none;">';
                results += '<div class="col-md-2">';
                results += '<img src='+data.response.results[i].fields.thumbnail+' class="img-responsive" />'
                results += '</div>';
                
                results += '<div class="col-md-10">';
                results += '<h4 class="news-date">'+new Date(Date.parse(data.response.results[i].webPublicationDate)).toDateString()+'</h4>';
                results += '<h3>'+data.response.results[i].fields.headline+'</h3>';
                results += '<p class="news-text">'+data.response.results[i].webTitle+'</p>';
                results += '</div>';
                
                
                results += '</a>';
                results += '</div>';
                results += '</div>';
                results += '</form>'; 
            });
        }
        $('#newsResults').html(results);
    })
}