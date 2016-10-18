var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios'); //Used for AJAX calls
var AllPlayersList = require('./AllPlayersList.jsx');
var Player = require('./Player.jsx');
var NewTournamentPlayers = require('./NewTournamentPlayers.jsx');
var CurrentTournament = require('./CurrentTournament.jsx')
var AddPlayerForm = require('./AddPlayerForm.jsx');
var GameStatsForm = require('./GameStatsForm.jsx')

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      allPlayersList: [], //Test data, remove later
      tourneyPlayersList: [],
      inProgress: false,
      currentGame: null,
      currentTournamentGames: [],
      currentTournament: null
    };
  }

  // This function makes a call to the server and returns all players from the
    // database
  getAllPlayers() {
    var self = this;
    axios.get('/api/player')
      .then(function(playerData) {
        self.setState({
          allPlayersList: playerData.data
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAllPlayers();
  }

  //createTournament will make a post request to the server, which will insert the
    // new tournament into the DB, and after that call the createGames function
  createTournament(tournyName) {
    // post request to the /api/tournaments endpoint with the tourneyName included
    axios.post('/api/tournaments', {
      // NOTE: This route is not finished yet
      tournament_name: tournyName
    }).then(function(response) {
      // then call createGames with the new tourney ID
      createGames(response.body.id);
    }).catch(function(err) {
      // handles some errors
      console.log(err, 'failed to create tournament');
    });
  }

  // createGames will be called when the button linked to createTournament is clicked.
  createGames(tourneyId) {

    var self = this;
    // post request to the /api/games endpoint with the the tourneyPlayerList
    axios.post('/api/games', {
      tourneyId: tourneyId,
      players: this.state.tourneyPlayersList
    }).then(function(response) {

      axios.get('/api/games', {
        params: {
          tournament_id: tourneyId
        }
      }).then(function(response) {
        var games = response;
        self.setState({
          currentTournamentGames: games
          inProgress: true
        });

      });
      // then if the games post was Successful, we set inProgress to true
    }).catch(function(err) {
      console.log(err, 'failed to post to games');
    });
  }



  // this function moves a Player component to the list they are not in
    // tourneyPlayersList into allPlayersList, and visa versa.
  movePlayer(playerComponent, index) {

    // check if the tourneyPlayersList has this Player
    if (this.state.tourneyPlayersList.includes(playerComponent)) {

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

      // same thing as above, just removing from allPlayersList and adding to the
        //  tourneylist
      this.state.tourneyPlayersList.push(out);

      this.forceUpdate();

    }
  }

  setCurrentGame(index) {
    this.setState({
      currentGame: this.state.currentTournamentGames[index]
    })
    console.log(this.state.currentGame)
  }

  render() {

    // if the tournament is in progress,
    if (this.state.inProgress) {
      // render the CurrentTournament app
      return (
        <div>
          <div className="row">
            
            <div className="col-xs-1">
            
            </div>

            <div className="col-xs-5">
                <CurrentTournament currentTournament={this.state.currentTournament} currentTournamentGames={this.state.currentTournamentGames} tourneyPlayersList={this.state.tourneyPlayersList} setCurrentGame={this.setCurrentGame.bind(this)}/>
            </div>

            <div className="col-xs-5">
                
            </div>

            <div className="col-xs-1">
            
            </div>
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
                <AddPlayerForm getAllPlayers={this.getAllPlayers.bind(this)} />
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
              <NewTournamentPlayers players={this.state.tourneyPlayersList} click={this.movePlayer.bind(this)} />
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
