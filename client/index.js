// route /client
var url = require('url');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json({'limit': '100mb'}));

router.get('/query', function(req, res) {
	var url_parts = url.parse(req.url, true);
	var queryString = url_parts.query.queryString;
	console.log('queryString='+queryString);
	router.suggestionEngine.sumbitQuery(queryString, function(suggestions) {
		res.json(suggestions);
	});
});

module.exports = router;