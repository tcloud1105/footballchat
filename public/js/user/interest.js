$(document).ready(function(){
    
    $('#favClubBtn').on('click', function(){
        var favClub = $('#favClub').val();
        
        var valid = true;
        
        if(favClub===''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }
        
        if(valid ===true){
            $.ajax({
                url: '/settings/interests',
                type:'POST',
                data: {
                    favClub: favClub
                },
                success: function(data){
                    $('#favClub').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200)
                }
            })
        }else{
            return false;
        }
    })
    
    $('#favPlayerBtn').on('click', function(){
        var favPlayer = $('#favPlayer').val();
        
        var valid = true;
        
        if(favPlayer===''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }
        
        if(valid ===true){
            $.ajax({
                url: '/settings/interests',
                type:'POST',
                data: {
                    favPlayer: favPlayer
                },
                success: function(data){
                    $('#favPlayer').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200)
                }
            })
        }else{
            return false;
        }
    })
    
     $('#favTeamBtn').on('click', function(){
        var favPlayer = $('#favTeam').val();
        
        var valid = true;
        
        if(favPlayer===''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }
        
        if(valid ===true){
            $.ajax({
                url: '/settings/interests',
                type:'POST',
                data: {
                    favPlayer: favPlayer
                },
                success: function(data){
                    $('#favTeam').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200)
                }
            })
        }else{
            return false;
        }
    })
})