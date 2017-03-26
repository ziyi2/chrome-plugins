//所有页面的请求记录
chrome.runtime.sendMessage("urlCatchEvent", function(response){
	$("#tabTime").html("<h1>" + response.tabTime.url + "</h1>" +
			"<h1>" + parseInt(response.tabTime.endTime - response.tabTime.startTime) + "ms</h1>"
		);

	var table = "<table><thead><tr><td style='width:200px'>time</td><td>url</td></tr></thead><tbody>"
	$.each(response.urlObj, function(key, object){
		table += "<tr><td>" + parseInt(object.completeTime - object.startTime) + "ms</td><td >" + key + "</td></tr>"
	})
	table += "</tbody></table>";
	$("#table").html($(table))
})