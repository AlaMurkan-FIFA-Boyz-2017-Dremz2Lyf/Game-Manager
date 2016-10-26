

// Initialize Firebase with auth and database
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
// Set the firebase configuration
var config = {
  apiKey: "AIzaSyD0hce93DrHal98fEUKRMyPsnxtJlEywNU",
  authDomain: "tournamentmanager-a5463.firebaseapp.com",
  databaseURL: "https://tournamentmanager-a5463.firebaseio.com",
  messagingSenderId: "530646916470"
};
firebase.initializeApp(config);

// Get a reference to the database service
var db = firebase.database();

db.goOffline();//think I need these to end any existing dbs and start a new one?
db.goOnline();

module.exports = db;
