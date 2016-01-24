var $ = require('jquery-no-dom');

//var queryString = '8803 N';
var queryString = '9106 W';

$.get('http://127.0.0.1/client/query/?queryString='+encodeURIComponent(queryString), function(data){
	console.log(data);
});