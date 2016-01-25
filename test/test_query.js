var $ = require('jquery-no-dom');

//var queryString = '8803 N';
//var queryString = '429 S St An';
var queryString = '9106 W';

var start = new Date().getTime();

$.get('http://127.0.0.1/client/query/?queryString='+encodeURIComponent(queryString), function(data){
	var end = new Date().getTime();
	console.log('duration (ms):' +(end-start).toString());
	console.log('');
	console.log(data);
});