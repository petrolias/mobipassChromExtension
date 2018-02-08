chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'libs/bower_components/socket-io-client/socket.io.js'
	});
});