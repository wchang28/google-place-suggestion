var $ = require('jquery-no-dom');

var queryString = '8803 Naomi';
//var queryString = '429 S St An';
//var queryString = '9106 Whitney A';

/*
var start = new Date().getTime();
$.get('http://127.0.0.1/client/query/?queryString='+encodeURIComponent(queryString), function(data){
	var end = new Date().getTime();
	console.log('');
	console.log('query=' + queryString);
	console.log('duration (ms):' +(end-start).toString());
	console.log(data);
});
*/

var counter = 0;
var received = 0;
var starts = [];
var queries = [];
setInterval(function() {
	if (counter < queryString.length) {
		var start = new Date().getTime();
		starts.push(start);
		var q = queryString.substr(0, ++counter);
		queries.push(q);
		$.get('http://127.0.0.1/client/query/?queryString='+encodeURIComponent(q), function(data){
			var end = new Date().getTime();
			var start = starts[received];
			var q = queries[received];
			console.log('');
			console.log('query=' + q);
			console.log('duration (ms):' +(end-start).toString());
			console.log(data);
			received++;
			if (received == queryString.length)
				process.exit(0);
		});
	}
}, 100);
