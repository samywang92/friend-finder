// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var friends = [{
    "name": "Ahmed",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
},
{
    "name": "Jeff",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [1, 1, 4, 4, 4, 1, 4, 5, 4, 3]
}
];

app.get("/", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newFriend);
    //Getting the difference of the new friend with everything in the database
    var dif1 = 0;
    var comparedFriends = [];
    for(var i in friends){
        var scores = friends[i].scores;
        for(var x in scores){
            dif1 += Math.abs(newFriend.scores[x]-scores[x]);
        }
        comparedFriends.push(dif1);
        dif1 = 0;
    }
    console.log("difference array: "+comparedFriends);
    //Getting the smallest difference of the people in the database 
    var smallest = comparedFriends[0];
    var bestMatch = 0;
    for(var i in comparedFriends){
        if(comparedFriends[i]<smallest){
            smallest = comparedFriends[i];
            bestMatch = i;
        }
    }
    //Now we add thew new friend
    friends.push(newFriend);
    //Push the best match to the front end
    res.json(friends[bestMatch]);
    console.log("best match: "+friends[bestMatch]);
    //res.json(newFriend);
  });

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
