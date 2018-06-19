var path = require('path');
var path = require('path');

var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post('/api/friends', function(req, res) {
		// Capture the user input
		var user = req.body;
		var userAnswers = user.scores;
		// best friend match, leave empty
		var friendMatch = '';
		var friendImage = '';
        var totalDifference = 10000;
        
        //runs through each friends object
        for (var i = 0; i < friends.length; i++) {

			// doing math stuff to calculate differences in answer
			var difference = 0;
			for (var d = 0; d < userAnswers.length; d++) {
				difference += Math.abs(friends[d].scores[d] - userAnswers[d]);
			}

			if (difference < totalDifference) {

				totalDifference = difference;
				friendMatch = friends[i].name;
				friendImage = friends[i].photo;
			}
		};


        friends.push(user);

		// Sending out friend match
		res.json({status: 'OK', friendMatch: friendMatch, friendImage: friendImage});
	});
};