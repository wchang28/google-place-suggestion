// route /worker_api
var url = require('url');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sse = require('sse-express');

router.use(bodyParser.json({'limit': '100mb'}));

router.use(function (req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

// sse messaging
router.get('/event_stream', sse(function(req, res) {
	// on first encountering a browser tab worker
	var workerId = req.connection.remoteAddress + ':' + req.connection.remotePort;
	console.log('detecting a worker {' + workerId + '}');
	var listener = function(event) {res.sseSend(event);}
	router.suggestionEngine.createNewWorker(workerId, listener);
	return {listener: listener, workerId: workerId};	
}, function(req, res, o) {
	router.suggestionEngine.removeWorker(o.workerId, o.listener);
}));

router.get('/worker_ready', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var workerId = url_parts.query.workerId;
	console.log('worker {' + workerId + '} is reporting ready');
	router.suggestionEngine.setWorkerReady(workerId);
	res.json({});
});

router.post('/query_result', function(req, res) {
	var q = req.body;
	//console.log('worker {' + q.workerId + '} returns result ' + JSON.stringify(q.suggestions));
	router.suggestionEngine.workerResolveQuery(q.workerId, q.queryId, q.suggestions);
	res.json({});
});

module.exports = router;