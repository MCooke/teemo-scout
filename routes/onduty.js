var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var https = require('https');
var config = require('../config.json');
var apiKey = config.api_key;

var championOptions = {
    uri: 'https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?dataById=true&champData=all&api_key=' + apiKey,
    json: true // Automatically parses the JSON string in the response 
};
var champions = '';
rp(championOptions).then(
		function(body){
			console.log('After champlookup');
			champions = body;
		}
	);
console.log('start Onduty');

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

	// console.log(summonerOptions.uri);
	 
	rp(summonerOptions)
		.then(function (body) {
			searchOptions.id = body[Object.keys(body)[0]].id;

			var currentGameOptions = {
			    uri: 'https://' + searchOptions.region + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/' + searchOptions.region + '1/' + searchOptions.id + '?api_key=' + apiKey,
			    json: true // Automatically parses the JSON string in the response 
			};
			// console.log(currentGameOptions.uri);

			rp(currentGameOptions)
				.then(function (body){
					var team1 = [];
					var team2 = [];

					// Add Champion information to particpants. 
					for(var i = 0; i < body.participants.length; i++) {
						var championId = body.participants[i].championId;
						body.participants[i].championName = champions.data[championId].name;
						if ( body.participants[i].teamId == "100") {
							team1.push( body.participants[i] );
						} else {
							team2.push( body.participants[i] );
						}
					}
					res.render('onduty', { title: 'Express', data: body, team1: team1, team2: team2 });
				}).catch(function (err) {
					// console.log(err);
					res.render('error', { error: err });
				});
		})
		.catch(function (err) {
			// console.log('summonerLookup error', err);
			res.render('error', { error: err });
		});
});

module.exports = router;