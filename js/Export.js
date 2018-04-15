$(document).ready(function(){

	document.getElementById('all-links').onclick = function() {
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
		return false;
	};
	document.getElementById('option-page').onclick = function() {
	
		chrome.tabs.create({url: "pages/options.html"}); 
		settings_tab = document.getElementById('settings');
		settings_tab.click();
	};
		
});