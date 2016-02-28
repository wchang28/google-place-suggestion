// route /admin_api
var router = require('json-api-router')();
var sse = require('sse-express');

// sse messaging
router.get('/event_stream', sse(function(req, res) {
	var listener = function(event) {
		res.sseSend(event);
	}
	router.eventSource.addListener('event', listener);
	return listener;	
}, function(req, res, listener) {
	router.eventSource.removeListener('event', listener);
}));

router.get('/server_states', function(req, res) {
	res.jsonp(router.suggestionEngine.toJSON());
});

module.exports = router;