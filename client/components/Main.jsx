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
      AllPlayersList : [], //Test data, remove later
      TourneyPlayersList : [],
      inProgress : false
    };
  }

  getAllPlayers() {
    var self = this;
    axios.get('/api/player')
      .then(function(playerData) {
        // self.setState({
        //   AllPlayersList : playerData.data
        // })
        console.log(playerData)
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAllPlayers()
  }


  // this function is passed through props and attached to a player component
    // in the list of existing players. It moves a player to the tournament to be.
  addPlayerToTourney(index, players) {
    this.setState({
      TourneyPlayersList : this.state.TourneyPlayersList.push(players[index])
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