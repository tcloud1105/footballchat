(function($){
    
    $.deparam = $.deparam || function(uri){
        
        if(uri===undefined){
            uri = window.location.pathname;
        }
        
        var value = window.location.pathname.split('/').pop();
        
        return value;
    }

})(jQuery)