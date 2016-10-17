var React = require('react');
var ReactDOM = require('react-dom');
var AllPlayersList = require('./AllPlayersList.jsx')
var Player = require('./Player.jsx')

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI',
      AllPlayersList : [],
      TourneyPlayersList : []
    };
  }

  render() {
    return (
      <div> {this.state.data}</div>
    );
  }

}

module.exports = Main;
