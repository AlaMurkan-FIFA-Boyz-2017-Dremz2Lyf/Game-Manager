var React = require('react');
var fb = require('../fbAuth.js');
var Button = require('react-native-button')

var FbLogin = (props) => {
  render() {
    return (
      <Button
        style={{ borderWidth: 1, borderColor='blue'}}
        onPress={ fb.fbSignIn() }>
          Sign in with Facebook
        </Button>
    )
  }
}

var Logout = (props) => {
  render() {
    return (
      <Button
        style={{ borderWidth: 1, borderColor: 'blue'}}
        onPress={ fb.signOut() }>
          Sign out
        </Button>
    )
  }
}
