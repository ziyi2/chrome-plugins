/**
 * 页面加载时间插件 xx 2017/3/26
 * 
 * @type {Object}
 */
var urlObj = {};
var tabTime = {};

/**
 * 监听tab的刷新事件
 * @author xx
 */
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        //重置tabTime 传入开始时间和url等字段
        if(tabTime && !tabTime.start){
            tabTime = {
                tabId : tabId,
                url : tab.url,
                startTime : 1,
                startTime : (new Date()).valueOf(),
                start : true
            }
        }
        // 重置url对象
        if(typeof changeInfo === "object" && changeInfo.status === "loading"){
            urlObj = {};
            console.log("tab loading");
        }
        //停止计时，记录停止时间
        if(typeof changeInfo === "object" && changeInfo.status === "complete"){
            tabTime.start = false;
            tabTime.endTime = (new Date()).valueOf();
        }
    }
);
//监听所有开始请求  
chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            if(details.url.indexOf("chrome-extension") == -1){
                urlObj[details.url] = {
                    startTime : details.timeStamp
                };
            }       	

          return {cancel: false};
        },
        {urls: ["<all_urls>"]},
        ["blocking"]
);

//监听所有结束请求  
chrome.webRequest.onCompleted.addListener(
        function(details) {
        	if(urlObj[details.url] && details.url.indexOf("chrome-extension") == -1){
                urlObj[details.url].completeTime = details.timeStamp
            }
        	// console.log(details.url);
          return {cancel: false};
        },
        {urls: ["<all_urls>"]},
	["responseHeaders"]
);
//监听插件的message事件
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message == "urlCatchEvent") {
        sendResponse({
            urlObj : urlObj,
            tabTime : tabTime
        });
    }
})