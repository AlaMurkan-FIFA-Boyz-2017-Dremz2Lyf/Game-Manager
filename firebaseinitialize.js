

// Initialize Firebase with auth and database
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
// Set the firebase configuration
var config = {
  serviceAccount: "TournamentManager-592bc37d77cb.json",
  databaseURL: "https://tournamentmanager-a5463.firebaseio.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var db = firebase.database();

database.goOffline();//think I need these to end any existing dbs and start a new one?
database.goOnline();

var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

module.exports = ref;
