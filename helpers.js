var register = function(Handlebars) {

    var helpers = {
        // put all of your helpers inside this object
        json: function (context) {
        	return JSON.stringify(context)
        },
        getChampion: function (context) {
        	console.log('champion', context);
        	console.log(champions.data[Object.keys(champions.data)[context]]);

        	// go in fin
        	return "champion:" + champions.data[Object.keys(champions.data)[context]];
        },
        stripWhiteSpace: function (context) {
        	return context.replace(' ', '');
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);