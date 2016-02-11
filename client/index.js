// route /client
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json({'limit': '100mb'}));

router.use(function (req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

router.get('/query', function(req, res) {
	var queryString = req.query.q;
	console.log('queryString='+queryString);
	router.suggestionEngine.sumbitQuery(queryString, function(suggestions) {
		res.json(suggestions);
	});
});

module.exports = router;