// route /worker_api
var router = require('json-api-router')();
var sse = require('sse-express');

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

router.get('/ack_ping', function(req, res) {
	var workerId = req.query.workerId;
	var ackTime = new Date();
	console.log('worker {' + workerId + '} >>> PING ACK <<< ' + ackTime.toUTCString());
	router.suggestionEngine.onWorkerPingAck(workerId, ackTime);
	res.json({});
});

router.get('/worker_ready', function(req, res) {
	var workerId = req.query.workerId;
	console.log('worker {' + workerId + '} is reporting ready');
	router.suggestionEngine.setWorkerReady(workerId);
	res.json({});
});

router.post('/query_result', function(req, res) {
	var q = req.body;
	console.log('worker {' + q.workerId + '} returns result ' + JSON.stringify(q.suggestions));
	router.suggestionEngine.workerResolveQuery(q.workerId, q.queryId, q.suggestions);
	res.json({});
});

module.exports = router;