function onClickHandler(info, tab) {
  if (info.menuItemId == "linkklipper") {
	chrome.windows.getCurrent(function(w) {
		chrome.tabs.getSelected(w.id,
		function (response){
			var regex = new RegExp(localStorage.regexLink.replace(/\\\\/g, '\\'));
			chrome.tabs.executeScript(null, {code: "var options = {exportFormat:'"+localStorage.exportFormat+"',regexLink:"+regex+",multipleExtensions:'"+localStorage.multipleExtensions+"',enabled:'"+localStorage.enabled+"'};"}, function(){
				chrome.tabs.executeScript(null, {file: "js/Extract.js"}, function(){
					//all injected
				});
			});
		});
	});
  }
  if (info.menuItemId == "options") {
	chrome.tabs.create({url: "pages/options.html"}); 
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({"title": "Link Klipper", "id": "main_menu","contexts":["selection","all"]});
	chrome.contextMenus.create(
	  {"title": "Extract All Links", "parentId": "main_menu", "id": "linkklipper","contexts":["selection","all"]});
	chrome.contextMenus.create(
	  {"title": "Options", "parentId": "main_menu", "id": "options","contexts":["selection","all"]});


});
