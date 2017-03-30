//console.log('content');
//
//var arr = [];

//document.body.onclick = function(e){
//    if(e.target.nodeName === "BUTTON"){
//        arr.push({
//            type : "buttonclick",
//            id : e.target.id,
//            class : e.target.className
//        })
//    }
//}
//
//document.onkeydown = function(e){
//    if(e.target.nodeName === "INPUT"){
//        arr.push({
//            type : "inputkeydown",
//            id : e.target.id,
//            class : e.target.className
//        })
//    }
//}
var port = chrome.extension.connect();
//监听插件的message事件
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "interfaceRecord")
            sendResponse({farewell: "goodbye"});
        else
            sendResponse({}); // snub them.
    });