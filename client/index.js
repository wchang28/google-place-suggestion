// route /client
var router = require('json-api-router')();

router.get('/query', function(req, res) {
	var queryString = req.query.q;
	console.log('queryString='+queryString);
	router.suggestionEngine.sumbitQuery(queryString, function(suggestions) {
		res.json(suggestions);
	});
});

module.exports = router;