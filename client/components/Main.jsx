var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios'); //Used for AJAX calls
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

  getAllPlayers: function() {
    axios.get('/api/player')
      .then(function(playerData) {
        console.log(playerData);
      });
      .catch(function(err) {
        console.log(err)
      });
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
