$(document).ready(function(){
    $('.add-btn').on('click',function(){
        $('#add-input').click();
    });
    
    $('#add-input').on('change', function(){
        var addInput = $('#add-input');
        
        if(addInput.val() != ''){
            var formData = new FormData();
           
            formData.append("upload",addInput[0].files[0]);
            $('#completed').html("file uploaded sucessfully")
            $.ajax({
                url:'/userupload',
                type:'POST',
                data:formData,
                processData: false,
                contentType: false,
                sucess: function(result){
                    addInput.val("");
                }
            })
        }
    })
})

