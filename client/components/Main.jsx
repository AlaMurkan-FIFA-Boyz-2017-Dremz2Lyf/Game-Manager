var React = require('react');
var ReactDOM = require('react-dom');
var AllPlayersList = require('./AllPlayersList.jsx')
var Player = require('./Player.jsx')

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI'
    };
  }

  render() {
    return (
      <div> Hi There it was!!!!!!!!!!!</div>
    );
  }

}

module.exports = Main;
