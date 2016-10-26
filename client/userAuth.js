var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

exports.createUser = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  console.log(error)
  var errorCode = error.code;
  var errorMessage = error.message;
})

exports.userSignIn = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  console.log(error)
  var errorCode = error.code;
  var errorMessage = error.message;
})

exports.userSignOut = firebase.auth().signOut().then(function(){
  console.log('signed out')
}, function(error){
  console.log(error)
})
