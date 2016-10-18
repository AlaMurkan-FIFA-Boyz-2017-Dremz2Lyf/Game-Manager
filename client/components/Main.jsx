var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios'); //Used for AJAX calls
var AllPlayersList = require('./AllPlayersList.jsx');
var Player = require('./Player.jsx');
var TournamentList = require('./TournamentList.jsx');
var FormInput = require('./FormInput.jsx');

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI',
      allPlayersList: ['Ben', 'Nick', 'Scott', 'Chris'], //Test data, remove later
      tourneyPlayersList: ['someone'],
      inProgress: false
    };
  }

  // This function makes a call to the server and returns all players from the
    // database
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
      players: this.state.tourneyPlayersList.push(players[index])
    });
  }

  // this function moves a Player component to the list they are not in
    // tourneyPlayersList into allPlayersList, and visa versa.
  movePlayer(name, index) {
    // check if the tourneyPlayersList has this Player
    if (this.state.tourneyPlayersList.includes(name)) {

      // if so, we move from that list with a splice.
      var out = this.state.tourneyPlayersList.splice(index, 1)[0];

      // then push the first index of that spliced out array into the allPlayersList
      this.state.allPlayersList.push(out);

      // force update should update the state now, as we are not setting state
        // inside a this.setState function
      this.forceUpdate();

    } else {
      // otherwise, we remove it from the players list and add to the touney list
      var out = this.state.allPlayersList.splice(index, 1)[0];

      this.state.tourneyPlayersList.push(out);

      // same thing as above, just in reverse
      this.forceUpdate();

    }
  }

  render() {

    // if the tournament is in progress,
    if (this.state.inProgress) {
      // render the CurrentTournament app
      return (
        <div>
          <div>
            some stuff here that will be awesome
          </div>
        </div>
      );
    } else {
      // otherwise render the create tournament app.
      return (
        <div>

          {/* this container holds the jumbotron */}
          <div className="container">
            <div className="jumbotron header">
              <h1>Create a Tournament</h1>
              <p>
                Welcome!
                <br />
                Create your tournament below by adding new players or picking from the list on the right!
              </p>
            </div>
          </div>


          {/* This row holds the add player form */}
          <div className="row">
            <div className="col-xs-1"></div>
            <div className="col-xs-10">
              <div className="container">
                <h2>Add Player</h2>
                <FormInput />
              </div>
            </div>
            <div className="col-xs-1"></div>
          </div>


          {/* this row holds both lists of players */}
          <div className="row">
            <div className="col-xs-1">
            </div>

            <div className="col-xs-5">
              {/* this will render out through the Player component into the players that we will make the tournament with */}
              <TournamentList players={this.state.tourneyPlayersList} click={this.movePlayer.bind(this)} />
            </div>

            <div className="col-xs-5">
              {/* this will render out with the existing players in the database, and ones added through the form */}
              <AllPlayersList players={this.state.allPlayersList} click={this.movePlayer.bind(this)}/>
            </div>

            <div className="col-xs-1">
            </div>
          </div>

        </div>
      );
    }
  }

}

module.exports = Main;