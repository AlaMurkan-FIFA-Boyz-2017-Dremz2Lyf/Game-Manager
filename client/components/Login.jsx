var React = require('react');
// var Button = require('react-native-button');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }


  facebookLogin () {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log('user: ', user)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('errorCode: ', errorCode, ' message: ', errorMessage)
    })
  }

  twitterLogin () {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
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
      console.log('sign in failed');
    })
  }

  googleLogin () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
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
    })
  }

  signOut () {
    firebase.auth().signOut().then(function() {
      console.log('signed out');
    }, function(error) {
      console.log('sign out failed: ', error);
    })
  }

  render () {
    return (
      <div>
        <div className="google-btn">
          <button type="submit"
                  style={{ borderWidth: 1, borderColor: 'green'}}
                  onSubmit={ this.googleLogin() }>
          Sign in with Google
          </button>
        </div>
        <div className="facebook-btn">
          <button type="submit"
                  style={{ borderWidth: 1, borderColor: 'blue'}}
                  onSubmit={ this.facebookLogin() }>
          Sign in with Facebook
          </button>
        </div>
        <div className="twitter-btn">
          <button type="submit"
                  style={{ borderWidth: 1, borderColor: 'lightblue'}}
                  onSubmit={ this.twitterLogin() }>
          Sign in with Twitter
          </button>
        </div>
        <div className="logout">
          <button type="submit"
                  style={{ borderWidth: 1, borderColor: 'red'}}
                  onSubmit={ this.signOut() }>
          Sign out
          </button>
        </div>
      </div>
    )
  }
}

module.exports = LoginForm;
