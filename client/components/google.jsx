var React = require('react');
var google = require('../googleAuth');
var Button = require('react-native-button');

var GoogleLogin = (props) => {
  render() {
    return (
      <Button
        style={{ borderWidth: 1, borderColor='green'}}
        onPress={ google.googleSignIn() }>
          Sign in with Google
        </Button>
    )
  }
}

var GoogleLogout = (props) => {
  render() {
    return (
      <Button
        style={{ borderWidth: 1, borderColor: 'green'}}
        onPress={ google.googleSignOut() }>
          Sign out
        </Button>
    )
  }
}
