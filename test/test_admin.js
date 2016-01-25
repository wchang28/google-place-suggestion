var $ = require('jquery-no-dom');

$.get('http://127.0.0.1/admin_api/server_states', function(data){
	console.log(data);
});