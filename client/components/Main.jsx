var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios'); //Used for AJAX calls
var AllPlayersList = require('./AllPlayersList.jsx');
var Player = require('./Player.jsx');
var NewTournamentPlayers = require('./NewTournamentPlayers.jsx');
var GameStatsForm = require('./GameStatsForm.jsx');
var AddPlayerForm = require('./AddPlayerForm.jsx');
var StartTournament = require('./StartTournament.jsx');
var CurrentTournament = require('./CurrentTournament.jsx');

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
  createTournament(tourneyName) {
    var context = this;
    // post request to the /api/tournaments endpoint with the tourneyName included
    axios.post('/api/tournaments', {
      // NOTE: This route is not finished yet
      tournament_name: tourneyName
    }).then(function(response) {
      // response.data holds an array with one number in it
        // this number is the tournamentId
      var tourneyId = response.data[0];

        // set the currentTournament key on state to an object with the id and name
      context.setState({
        currentTournament: { id: tourneyId, tournament_name: tourneyName }
      });
      // then call createGames with the new tourney ID
      context.createGames.call(context, tourneyId);
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
      // when the games are posted, get back all the games for the current tournament.
      axios.get('/api/games', {
        params: {
          tournament_id: tourneyId
        }
      }).then(function(response) {

        // then if the games post was Successful, we set inProgress to true
        var games = response.data;
        self.setState({
          currentTournamentGames: games,
          inProgress: true
        });

      }).catch(function(err) {
        console.log('Error in get games with tourneyID:', err);
      });
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
    });
  }

  render() {

    // if the tournament is in progress,
    if (this.state.inProgress) {
      // render the CurrentTournament app
      return (
        <div>
          <div className="container">
            <div className="jumbotron header">
              <h1>Game time!</h1>
              <p>
                Kick off!
                <br />
                Start with your first game below, or click one to start any game!
              </p>
            </div>

          </div>


          <div className="row">

            <div className="col-xs-1">

            </div>

            <div className="col-xs-5">
              <CurrentTournament currentTournament={this.state.currentTournament} currentTournamentGames={this.state.currentTournamentGames} tourneyPlayersList={this.state.tourneyPlayersList} setCurrentGame={this.setCurrentGame.bind(this)}/>
            </div>

            <div className="col-xs-5">
              <div className="panel panel-default">
                <div className="panel-heading"><h3>Table</h3></div>
                <div className="panel-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Games Played</th>
                        <th>Won</th>
                        <th>Loss</th>
                        <th>Draw</th>
                        <th>GD</th>
                      </tr>
                    </thead>
                    {/* NOTE: THIS WILL BE WHERE THE TABLE IS RENDERED. An outer element of <tbody> around each player's stats */}
                  </table>
                </div>
              </div>
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
              <div className="panel panel-default">
                <div className="panel-heading">New Tournament Players</div>
                <div className="panel-body">
                  <StartTournament create={this.createTournament.bind(this)}/>
                  <NewTournamentPlayers players={this.state.tourneyPlayersList} click={this.movePlayer.bind(this)} />
                </div>
              </div>
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
