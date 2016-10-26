var React = require('react');
var twitter = ('../twitterAuth');
var Button = require('react-native-button');

var TwitterLogin = (props) => {
  render() {
    return (
      <Button
        style={{borderWidth=1, borderColor='lightblue'}}
        onPress={twitter.twitterSignIn()}>
          Sign in with Twitter
        </Button>
    )
  }
}

var TwitterSignOut = (props) => {
  render() {
    return (
      <Button
        style={{borderWidth=1, borderColor='lightblue'}}
        onPress={twitter.twitterSignOut()}>
          Sign out of Twitter
        </Button>
    )
  }
}
