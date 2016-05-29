var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.param('test'));
  res.render('index', { title: 'Express', data: data });
});

module.exports = router;
