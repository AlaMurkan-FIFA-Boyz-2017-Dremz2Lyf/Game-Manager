var React = require('react');
var google = require('../googleAuth.js');
var Button = require('react-native-button');

var GoogleLogin = React.CreateClass ({
  render() {
    return (
      <Button
        style={{ borderWidth: 1, borderColor='green'}}
        onPress={ google.googleSignIn() }>
          Sign in with Google
        </Button>
    )
  }
})
