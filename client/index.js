// route /client
var router = require('json-api-router')();

router.post('/query', function(req, res) {
    var data = req.body;
	var queryString = data.q;
    var position = (data.position ? data.position : null);
	console.log('incoming query: ' + JSON.stringify(data));
	router.suggestionEngine.sumbitQuery(queryString, position, function(suggestions) {
		console.log('returning suggesting for query="' + queryString + '", suggestions='+ JSON.stringify(suggestions));
		res.json(suggestions);
	});
});

module.exports = router;