var React = require('react');
// var Button = require('react-native-button');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
const db = require('../../firebaseinitialize.js');
const usersRef = db.ref('users/');


class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  writeData (uid, username) {
    var newUsersRef = usersRef.push()
    newUsersRef.set({
      uid,
      username
    })
  }

  facebookLogin () {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      this.writeData(user.uid, user.displayName)
      console.log('user: ', user)
      return user
    }.bind(this)).catch(function(error) {
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
      this.writeData(user.uid, user.displayName)
      console.log('user: ', user.displayName)
    }.bind(this)).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('errorMessage: ', errorMessage);
    })
  }

  googleLogin () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log('user: ', user.displayName, ' uid: ', user.uid)
      this.writeData(user.uid, user.displayName)
    }.bind(this)).catch(function(error) {
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
        <div className="login-btn google-btn">
          <button type="submit" onClick={ this.googleLogin.bind(this) }>
          Sign in with Google
          </button>
        </div>
        <div className="login-btn facebook-btn">
          <button type="submit" onClick={ this.facebookLogin.bind(this) }>
          Sign in with Facebook
          </button>
        </div>
        <div className="login-btn twitter-btn">
          <button type="submit" onClick={ this.twitterLogin.bind(this) }>
          Sign in with Twitter
          </button>
        </div>
        <div className="login-btn logout">
          <button type="submit" onClick={ this.signOut.bind(this) }>
          Sign out
          </button>
        </div>
      </div>
    )
  }
}

module.exports = LoginForm;
