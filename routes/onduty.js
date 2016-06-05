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

	rp(summonerOptions)
		.then(function (result1) {
			// SUMMONER LOOKUP - To get summoner id.

			searchOptions.id = result1[Object.keys(result1)[0]].id;

			var currentGameOptions = {
			    uri: 'https://' + searchOptions.region + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/' + searchOptions.region + '1/' + searchOptions.id + '?api_key=' + apiKey,
			    json: true // Automatically parses the JSON string in the response 
			};

			return rp(currentGameOptions);
		})
		.then(function(result2) {
			var participantsList = '';

			for(var i = 0; i < result2.participants.length; i++) {
				var championId = result2.participants[i].championId;
				participantsList += result2.participants[i].summonerId + ",";
			}

			result2.participantsList = participantsList;

			var rankedStatsOptions = {
			    uri: 'https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/' + result2.participantsList + '?api_key=' + apiKey,
			    json: true // Automatically parses the JSON string in the response 
			};

			return rp(rankedStatsOptions).then( function(reply){
				result2.leagues = reply;
				return result2;
			});
		})
		.then(function(result) {
			// console.log('leagues', result)

			result.team1 = [];
			result.team2 = [];

			console.log('before result.participants.length', result.participants.length);
			// Add Champion information to particpants. 
			// console.log('result.leagues', result.leagues);
			for(var i = 0; i < result.participants.length; i++) {
				var championId = result.participants[i].championId;

				console.log('result.leagues.length', Object.keys(result.leagues).length);
				// result.leagues.forEach(function(element, index, array){
				// 	 console.log('a[' + index + '] = ' + element);
				// });
				for(var j = 0; j < Object.keys(result.leagues).length; j++) {
					var thisLeagueResult = result.leagues[Object.keys(result.leagues)[j]][0];
					console.log('thing', thisLeagueResult.participantId);
					if (thisLeagueResult.participantId == result.participants[i].summonerId){
						result.participants[i].league = thisLeagueResult;
					}
				}

				result.participants[i].championName = champions.data[championId].name;
				if ( result.participants[i].teamId == "100") {
					result.team1.push( result.participants[i] );
				} else {
					result.team2.push( result.participants[i] );
				}
			}

			res.render('onduty', { title: 'Express', data: result });
		})
		.catch(function (err) {
			// console.log('summonerLookup error', err);
			res.render('error', { error: err });
		});
});

module.exports = router;