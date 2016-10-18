var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios'); //Used for AJAX calls
var AllPlayersList = require('./AllPlayersList.jsx');
var Player = require('./Player.jsx');

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI',
      AllPlayersList: ['Ben', 'Nick', 'Scott', 'Chris'], //Test data, remove later
      TourneyPlayersList: [],
      inProgress: false
    };
  }

  // This function makes a call to the server and returns all players from the
    // database
  getAllPlayers() {
    axios.get('/api/player')
      .then(function(playerData) {
        console.log(playerData);
      })
      .catch(function(err) {
        console.log(err);
      });
  }



  // this function is passed through props and attached to a player component
    // in the list of existing players. It moves a player to the tournament to be.
  addPlayerToTourney(index, players) {
    this.setState({
      players: this.state.TourneyPlayersList.push(players[index])
    });
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
