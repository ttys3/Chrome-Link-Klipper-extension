$( window ).load(function() {

	var defaultEnabled = "0";
	var enabled = localStorage.enabled;
	if (enabled == undefined || (enabled != "1" && enabled != "2")) {
		enabled = defaultEnabled;
	}
	localStorage["enabled"] = enabled;
	$('input:radio[name=match][value="'+enabled+'"]').prop('checked', true);

	//Extension format
	var defaultFormat = "csv";
	var format = localStorage.exportFormat;
	if (format == undefined || (format != "csv" && format != "txt")) {
		format = defaultFormat;
	}
	localStorage["exportFormat"] = format;
	$(".export-format").val(format);

	//Regex name
	var defaultRegex = "";
	var link = localStorage.regexLink;
	if (link == undefined) {
		link = defaultRegex;
	}
	localStorage["regexLink"] = link;
	$("#regexName").val(link);
	
	//Multiple extensions
	var defaultExtensions = "";
	var extensions = localStorage.multipleExtensions;
	if (extensions == undefined) {
		extensions = defaultExtensions;
	}
	localStorage["multipleExtensions"] = extensions;
	$("#extensions").val(extensions);
	
	var enabled = $('input[name=match]:checked').val();
});

$( document ).ready(function() {

	$("[data-toggle=tooltip").tooltip();

	$(".save").click(function(){

		$(".alert").hide();

		var ignore = [];
		var storage = JSON.parse(localStorage.settings);

		localStorage["enabled"] = 0;
		
		//Enabled format
		var enabled = $('input[name=match]:checked').val();

		if(enabled != "1" && enabled != "2")
			enabled = "0";
		else
		{
			if(enabled == "1")
				$("#extensions").val("");
			else
				$("#regexName").val("");
		}

		//Extension format
		var format = $(".export-format").val();
		localStorage["exportFormat"] = format;
		
		//Regex name
		var link = $("#regexName").val();
		
		if(enabled == "1" && link == "")
		{
			$("#regexName").parents('.input-group').addClass('has-error');
			$("#extensions").parents('.input-group').removeClass('has-error');
			return false;
		}
		else
		{
			$("#regexName").parents('.input-group').removeClass('has-error');
			$(".error-x").hide();

			if(link != "")
			{
				var isValid;

				try { 
				    new RegExp(link);
				    isValid = true;
				}
				catch(e) {
				    isValid = false;
				}

				if (!isValid)
				{
					$("#regexName").parents('.input-group').addClass('has-error');
					return false;
				}

				localStorage["regexLink"] = link;
				localStorage["enabled"] = enabled;
			}
			else
			{
				localStorage["regexLink"] = "";
			}
		}
		
		//Multiple extensions
		var extensions = $("#extensions").val();

		if(enabled == "2" && extensions == "")
		{
			$("#extensions").parents('.input-group').addClass('has-error');
			$("#regexName").parents('.input-group').removeClass('has-error');
			return false;
		}
		else
		{
			$("#extensions").parents('.input-group').removeClass('has-error');
			$(".error-x").hide();

			if(extensions != "")
			{
				localStorage["multipleExtensions"] = extensions;
				localStorage["enabled"] = enabled;
			}
			else
			{
				localStorage["multipleExtensions"] = "";
			}
		}
		
		if((localStorage["enabled"] == 1 && localStorage["regexLink"] != "") || (localStorage["enabled"] == 2 && localStorage["multipleExtensions"] != ""))
		{
			ignore.push("1");
		}
		
		if(localStorage["enabled"] == 1 && localStorage["enabled"] != "")
		{
			ignore.push(localStorage["regexLink"]);
		}
		else if(localStorage["enabled"] == 2 && localStorage["multipleExtensions"] != "")
		{
			var exts = localStorage["multipleExtensions"].split(",");
			var length = exts.length;
			for(var i=0; i<length; i++) {
				ignore.push(exts[i]);
			}
		}
		
		if(ignore.length == 0)
			ignore.push(0);

		var settings = {
			"actions": {
				"101": {
					"mouse": 2,
					"key": 17,
					"action": "tabs",
					"color": "#000",
					"options": {
						"enabled" : enabled,
						"smart": 0,
						"ignore": ignore,
						"delay": 0,
						"close": 0,
						"block": true,
						"reverse": false,
						"end": false
					}
				},
				"1404985460294": {
					"mouse": 2,
					"key": 93,
					"action": "tabs",
					"color": "#000",
					"options": {
						"enabled" : enabled,
						"smart": 0,
						"ignore": ignore,
						"delay": 0,
						"close": 0,
						"block": true,
						"reverse": false,
						"end": false
					}
				},
				"1404985951317": {
					"mouse": 2,
					"key": 91,
					"action": "tabs",
					"color": "#000",
					"options": {
						"enabled" : enabled,
						"smart": 0,
						"ignore": ignore,
						"delay": 0,
						"close": 0,
						"block": true,
						"reverse": false,
						"end": false
					}
				}
			},
			"blocked": []
		};
		
		localStorage['settings'] = JSON.stringify(settings);
		
		$(".alert").fadeIn('slow');
		
		setTimeout(function(){$(".alert").fadeOut();}, 4000);
	})

	$(".reset").click(function(){
	
		// Reset all the settings
		$('.export-format').prop('selectedIndex',0);
		$('#regexName').val("");
		$('#extensions').val("");
		$('.radio').removeAttr('checked',false);

		$("#regexName").parents('.input-group').removeClass('has-error');
		$("#extensions").parents('.input-group').removeClass('has-error');

	});

	$( ".radio-text" ).focus(function() {
		
		$(this).prev().children().prop("checked", true).trigger("click");
	});
	
	// check for hash
	url_hash = window.location.hash
	if(url_hash!='')
	{
		$('#optionsTab a[href="' + url_hash + '"]').tab('show');
	}
});