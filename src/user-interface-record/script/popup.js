//所有页面的请求记录
$(document).ready(function() {
    $("#start").on("click", function(){
        chrome.runtime.sendMessage("interfaceRecord", function(response){
            console.log(response)
        })
    })
})
