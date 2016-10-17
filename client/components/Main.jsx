var React = require('react');
var ReactDOM = require('react-dom');
var AllPlayersList = require('./AllPlayersList.jsx')
var Player = require('./Player.jsx')

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI',
      AllPlayersList : ['Ben', 'Nick', 'Scott', 'Chris'], //Test data, remove later
      TourneyPlayersList : [],
      inProgress : false
    };
  }

  addPlayerToTourney(index, players) {
    this.setState({
      players: this.state.TourneyPlayersList.push(players[index])
    })
  }

  render() {
    return (
      <div>
        <div>
          <AllPlayersList players={this.state.AllPlayersList} click={this.addPlayerToTourney.bind(this)}/>
        </div>
      </div>
    );
  }

}

module.exports = Main;
