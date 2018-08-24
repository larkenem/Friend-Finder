var path = require('path');
//var path = require('path');

var friends = require('../data/friends');

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends)
    });

    app.post("/api/new", function(req, res) {
		// Capture the user input
		var user = req.body;
		var userAnswers = user.scores;
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: []
		}

		var answers = []

		for(var i = 0; i < userAnswers.length; i++) {
			answers.push(parseFloat(userAnswers[i]))

		}

		newFriend.scores = answers;

		var comparison = [];
		for(var j = 0; j < friends.length; j++) {
			var current = 0;
			for(var g = 0; g < newFriend.scores.length; g++) {
				current += Math.abs(newFriend.scores[g] - friends[j].scores[g]);
			}	
			comparison.push(current);
		} 

		var closest = 0;

		for(var index = 0; index < comparison.length; index++) {
			if(comparison[index] <= comparison[closest]) {
				closest = index
			}
		}

		var bestMatch = friends[closest];

		res.json(bestMatch);

		friends.push(newFriend);

	})

};
			
		
		// best friend match, leave empty
	// 	var friendMatch = '';
	// 	var friendImage = '';
    //     var totalDifference = 10000;
        
    //     //runs through each friends object
    //     for (var i = 0; i < friends.length; i++) {

	// 		// doing math stuff to calculate differences in answer
	// 		var difference = 0;
	// 		for (var d = 0; d < userAnswers.length; d++) {
	// 			difference += Math.abs(friends[d].scores[d] - userAnswers[d]);
	// 		}

	// 		if (difference < totalDifference) {

	// 			totalDifference = difference;
	// 			friendMatch = friends[i].name;
	// 			friendImage = friends[i].photo;
	// 		}
	// 	};

	// 	console.log("best match: ", friends[index]);
    //     friends.push(user);

	// 	// Sending out friend match
	// 	res.json({status: 'OK', friendMatch: friendMatch, friendImage: friendImage});
	// });
// 	};
// };