

var friendsList = require("../data/friends");


module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friendsList);
	});

	app.post("/api/friends", function(req, res) {
		
		var newPerson;
		var allDifferences = [];
	
		newPerson = req.body.scores;
	    console.log("\n-----------------------------\nnew person scores:", newPerson);
	    console.log("friends full array:", friendsList);

	    for (var i = 0; i < friendsList.length; i++) {

	    	var existingFrnds = friendsList[i].scores;
	    	var difference = 0;
	    	console.log("just scores", existingFrnds,"\n----------------\n");

	    	for (var j = 0; j < existingFrnds.length; j++) {
	    		console.log("arr items: - existing:", existingFrnds[j], ", new person:", newPerson[j]);
	    		difference += Math.abs(parseInt(existingFrnds[j]) - parseInt(newPerson[j]) );
	    	}
	    	console.log("difference with ", i, ":",difference);

	    	allDifferences.push({"difference": difference, "index": i});
	    }
	    console.log("\nallDifferences:", allDifferences);

	    allDifferences.sort(function(a,b){
	    	return ( parseInt(a.difference) - parseInt(b.difference) );
	    });
	    console.log("\nallDifferences after sorting:", allDifferences);

	    var matchFound = friendsList[allDifferences[0].index];
	    console.log("\nMatch found:", matchFound);
	    friendsList.push(req.body);
	    console.log("\nfriendsList:", friendsList);
	    res.json(matchFound);
  });
}