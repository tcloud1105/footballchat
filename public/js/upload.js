$(document).ready(function(){
    $('.upload-btn').on('click',function(){
        $('#upload-input').click();
    });
    
    $('#upload-input').on('change', function(){
        var uploadInput = $('#upload-input');
        console.log(uploadInput);
        
        if(uploadInput.val() != ''){
            var formData = new FormData();
           
            formData.append("upload",uploadInput[0].files[0]);
             console.log(formData);
            $.ajax({
                url:'/uploadFile',
                type:'POST',
                data:formData,
                processData: false,
                contentType: false,
                sucess: function(result){
                    uploadInput.val("");
                }
            })
        }
    })
})

