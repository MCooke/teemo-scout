var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var https = require('https');
var config = require('../config.json');
var apiKey = config.api_key;

var data = '';


/* GET home page. */
router.get('/', function(req, res, next) {
	var searchOptions = {
		region: 'euw',
		name: '',
		id: ''
	}

	if ( req.query.region != undefined ){
		searchOptions.region = req.query.region;
	}
	if ( req.query.name != undefined){
		searchOptions.name = req.query.name;
	}

	var summonerOptions = {
	    uri: 'https://' + searchOptions.region + '.api.pvp.net' + '/api/lol/' + searchOptions.region + '/v1.4/summoner/by-name/' + searchOptions.name + '?api_key=' + apiKey,
	    json: true // Automatically parses the JSON string in the response 
	};

	console.log('uri', summonerOptions.uri);
	 
	rp(summonerOptions)
		.then(function (body) {
			console.log(body);
			searchOptions.id = body[Object.keys(body)[0]].id;

			var currentGameOptions = {
			    uri: 'https://' + searchOptions.region + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/' + searchOptions.id + '?api_key=' + apiKey,
			    json: true // Automatically parses the JSON string in the response 
			};

			console.log(currentGameOptions.uri);
			rp(currentGameOptions)
				.then(function (body){
					console.log('body',body);
					res.render('onduty', { title: 'Express', data: body });
				}).catch(function (err) {
					console.log(err);
					res.render('error', { error: err });
				});
		})
		.catch(function (err) {res.render('error', { error: err });});
});

module.exports = router;