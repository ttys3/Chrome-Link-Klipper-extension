var rejectPattern = /^javascript:|mailto:/;

var csv = [];
var txt = '';
var extsArray = [];

if(options.multipleExtensions != "") {

	var extensions = options.multipleExtensions.split(",");
	var length = extensions.length;
	for(var i=0; i<length; i++) {
		extsArray.push(extensions[i]);
	}
}

links = new Array();

for (var i = 0; i < document.links.length; i++) {
	links.push({ "title" : document.links[i].innerText, "url" : document.links[i].href });
}

var arr = {};

for ( var i=0, len=links.length; i < len; i++ )
    arr[links[i]['url']] = links[i];

links = new Array();
for ( var key in arr )
    links.push(arr[key]);

var arrUnique = links;

//for csv
var buildRow = ['Link, Anchor Text'];
csv.push(buildRow.join(','));

for (var i = 0; i < arrUnique.length; i++) {
	
	if (!rejectPattern.exec(arrUnique[i].url) && arrUnique[i].url != '') {

		if(options.enabled > 0)
		{
			if(options.enabled == 1)
			{
				var regex = options.regexLink;
				
				if(regex.test(arrUnique[i].url))
				{
					//for csv
					var buildRow = ['"' + arrUnique[i].url + '", ' + arrUnique[i].title + ''];
					csv.push(buildRow.join(','));
					
					//for txt
					txt += arrUnique[i].url+"\r\n";
				}
			}
			else if(options.enabled == 2)
			{
				var ext = arrUnique[i].url.split('.').pop();
				
				if(extsArray.length)
				{
					if (extsArray.indexOf(ext) != -1)
					{
						//for csv
						var buildRow = ['"' + arrUnique[i].url + '", ' + arrUnique[i].title + ''];
						csv.push(buildRow.join(','));
						
						//for txt
						txt += arrUnique[i].url+"\r\n";
					}
				}
				else
				{
					//for csv
					var buildRow = ['"' + arrUnique[i].url + '", ' + arrUnique[i].title + ''];
					csv.push(buildRow.join(','));
					
					//for txt
					txt += arrUnique[i].url+"\r\n";
				}
			}
		}
		else
		{
			//for csv
			var buildRow = ['"' + arrUnique[i].url + '", ' + arrUnique[i].title + ''];
			csv.push(buildRow.join(','));
			
			//for txt
			txt += arrUnique[i].url+"\r\n";
		}
	}
}

var d = new Date();
var name = document.domain+"_"+specialFormat(new Date())+"."+options.exportFormat;
var link = document.createElement('a');
document.body.appendChild(link);

if(options.exportFormat == 'txt')
{
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
}
else
{
	var myBlob = new Blob([csv.join('\n')], {"type": "text\/plain"});
	link.href = window.URL.createObjectURL(myBlob);
}

link.download = name;
link.click(); 
element = link;
element.parentNode.removeChild(element);

function ordinal(number) {
  number = Number(number)
  if(!number || (Math.round(number) !== number)) {
    return number
  }
  var signal = (number < 20) ? number : Number(('' + number).slice(-1))
  switch(signal) {
    case 1:
      return number + 'st'
    case 2:
      return number + 'nd'
    case 3:
      return number + 'rd'
    default:
      return number + 'th'
  }
}

function specialFormat(date) {
  // add two weeks
  date = new Date()
  var months = [
    'Jan'
    , 'Feb'
    , 'Mar'
    , 'Apr'
    , 'May'
    , 'Jun'
    , 'Jul'
    , 'Aug'
    , 'Sept'
    , 'Oct'
    , 'Nov'
    , 'Dec'
  ]
  var formatted = ordinal(date.getDate())
  formatted += '_' + months[date.getMonth()]
  return formatted + '_' + date.getFullYear()
}

function unique(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}