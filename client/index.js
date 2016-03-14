// route /client
var router = require('json-api-router')();

router.post('/query', function(req, res) {
    var data = req.body;
	var queryString = data.q;
    var position = (data.position ? data.position : null);
	console.log('queryString=' + queryString+ ', position=' + JSON.stringify(position));
	router.suggestionEngine.sumbitQuery(queryString, position, function(suggestions) {
		//console.log('I am here. suggestions = '+ JSON.stringify(suggestions));
		res.json(suggestions);
	});
});

module.exports = router;