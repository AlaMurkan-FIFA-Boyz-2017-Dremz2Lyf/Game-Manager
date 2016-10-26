var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var provider = new firebase.auth.TwitterAuthProvider();

exports.twitterSignIn = firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  console.log('user: ', user, ' is signed in')
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log('sign in failed')
});

exports.twitterSignOut = firebase.auth().signOut().then(function() {
  console.log('signed out of twitter')
}, function(error) {
  console.log(error)
});
