var http = require('http');
var https = require('https');
var express = require('express');
var path = require('path');
var SuggestionEngine = require('./suggestionEngine.js');
var app = express();
var events = require('events');
var EventEmitter = (events.EventEmitter ? events.EventEmitter : events);	// to support older versions of node js

var suggestionEngine = new SuggestionEngine();
var eventSource = new EventEmitter();

suggestionEngine.onChange = function(o) {
	console.log('');
	console.log('server states');
	console.log('=============================');
	console.log(JSON.stringify(o));
	console.log('=============================');
	eventSource.emit({event: 'STATES', states: o});
}

app.use(function(req, res, next) {
	var req_address = req.connection.remoteAddress;
	console.log('incoming request from ' + req_address + ', path='+ req.path);
	
	next();
});

var clientRoute = require(path.join(__dirname, 'client'));
var workerApiRoute = require(path.join(__dirname, 'worker_api'));
var adminApiRoute = require(path.join(__dirname, 'admin_api'));

clientRoute.suggestionEngine = suggestionEngine;
workerApiRoute.suggestionEngine = suggestionEngine;
adminApiRoute.suggestionEngine = suggestionEngine;
adminApiRoute.eventSource = eventSource;

app.use('/worker', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/client', clientRoute);
app.use('/worker_api', workerApiRoute);
app.use('/admin_api', adminApiRoute);

var server = http.createServer(app);

var secure_http = false;
var port = 80;
var host = '127.0.0.1';
//var port = 8000;
//var host = '0.0.0.0';
server.listen(port, host, function() { 
	var host = server.address().address; 
	var port = server.address().port; 
	console.log('application listening at %s://%s:%s', (secure_http ? 'https' : 'http'), host, port); 
}); 
