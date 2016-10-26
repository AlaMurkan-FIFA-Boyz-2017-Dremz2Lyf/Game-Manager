var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var provider = new firebase.auth.GoogleAuthProvider();

exports.googleSignIn = firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
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
  console.log('errorCode: ', errorCode, 'errorMessage: ', errorMessage);
});

// exports.googleSignOut = firebase.auth().signOut().then(function() {
//   //sign out was success
//   console.log('signed out');
// }, function(error) {
//   console.log(error)
// })
