$(document).ready(function(){
    
    $('#favorite').on('submit', function(e){
        e.preventDefault();
        
        var id = $('#id').val();
        var clubName = $('#club_name').val();
        
        $.ajax({
            url:'/home',
            type:'POST',
            data:{
                id:id,
                clubName:clubName
            },
            success:function(results){
                console.log(clubName)
            }
        })
    })
})