
//监听插件的message事件
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message == "interfaceRecord") {
        sendResponse("11");
    }
})