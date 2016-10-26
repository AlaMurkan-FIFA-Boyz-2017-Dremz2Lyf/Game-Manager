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
var FinishTournament = require('./FinishTournament.jsx');
var OngoingTournamentsList = require('./OngoingTournamentsList.jsx');
var StatsTable = require('./StatsTable.jsx');
var utils = require('../utils.js');

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      // currentTournamentTable will hold objects for each player in the current tournament.
        // These objects will have all the stats to be rendered to the Tournament's Table/Standings
      currentTournamentTable: [],
      // allPlayersList holds all existing players as objects.
        // These objects have id and username keys/values.
      allPlayersList: [],
      // tourneyPlayersList holds all players in the current/to be created tournament
        // Same player objects as the allPlayersList
      tourneyPlayersList: [],
      // currentGame will (surprise!) hold the current game.
        // This allows us to add data to this game from the GameStatsForm
      currentGame: null,
      // currentTournamentGames hold all the current tournament's games. (Seeing a patern here? ;p)
        // Each item in the array is a game object. These game objects hold player1_id, player2_id and
        // a bunch of data fields to track the stats.
      currentTournamentGames: [],
      // Bet you can guess what currentTournament is :D.
      currentTournament: null,
      // This one here isn't to hard to guess either!
      ongoingTournamentsList: [],

      statsView: false,

      pongView: false,

      statLines: []
    };
  }

  componentDidMount() {
    var self = this;
    // utils.getAllPlayers makes a call to the server for all players from the database.
      // State is passed in so we can check against the tournament players list.
      // It also returns a promise.
    utils.getAllPlayers(this.state).then(function(response) {
      // So within a .then we can set the state to the players array
      self.setState({
        // Adds the players from the db not already in a tourney to allPlayersList
        allPlayersList: response
      });
    });
    // getOngoingTournaments populates the in progress tournament list
    utils.getOngoingTournaments().then(function(tourneys) {
      self.setState({
        // Add the ongoing tournaments to the state
        ongoingTournamentsList: tourneys
      });
    });
  }

  addPlayer() {
    // get some 'this' binding
    var self = this;
    // getAllPlayers needs access to the state for the list of tournament players, so it accepts that as an argument.
    utils.getAllPlayers(this.state).then(res => {
      // It returns a promise object that resolves with the list of players filtered
        // against players already in the tournament list. We set this to state.
      self.setState({
        allPlayersList: res
      });
    });
  }

  //createTournament will make a post request to the server, which will insert the
    // new tournament into the DB, and after that call the createGames function
  createTournament(tourneyName) {
    var context = this;
    var enough = true;
    // post request to the /api/tournaments endpoint with the tourneyName included
    if (this.state.tourneyPlayersList.length < 2) {
      enough = false;
    }

    return axios.post('/api/tournaments', {
      tournament_name: tourneyName,
      enough: enough
    }).then(function(response) {
        // response.data holds an array with one number in it
          // this number is the tournamentId
      var tourneyId = response.data[0];

      context.createGames(context, tourneyId, context.state.tourneyPlayersList)
          .then(res => {
            context.setState({
              // currentTournamentTable: res,
              currentTournament: { id: tourneyId, tournament_name: tourneyName }
            });
            // NOTE: This function call is failing because when we create a new tournament,
              // getTableForTourney gets all the game for that tournament, then filters down to only the games played.
              // On the result of that filter, we call a reduce function to create the objects for the table.
              // This is not a problem right now, but in the future.
            utils.getTableForTourney(tourneyId)
            .then(res => {
              // set the currentTournament key on state to an object with the id and name
              context.setState({
                currentTournamentTable: res
              });
            })
            .catch(err => {
              throw err;
            });
          }).catch(err => {
            throw err;
          });



        // then call createGames with the new tourney ID
    }).catch(function(err) {
        // handles some errors
      throw err;
    });
  }

  // createGames will be called when the button linked to createTournament is clicked.
  createGames(context, tourneyId, list) {
    var self = this;

    // Post request to the /api/games endpoint with the the tourneyPlayerList.
    return utils.postGames(tourneyId, list)
      .then(function(response) {
        // getGamesByTourneyId returns a promise object that resolves with two keys; games, and nextGame
        utils.getGamesByTourneyId(tourneyId).then(function(res) {
          self.setState({
            // We take those and set them to their appropriate state keys.
            currentTournamentGames: res.games,
            currentGame: res.nextGame
          });
        })
        .catch(function(err) {
          // This error handles failures in the getting of games back.
          console.log('Error in get games by tourneyID:', err);
        });
      }).catch(function(err) {
        // This error handles failures posting games to the server/database.
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

  // setCurrentGame takes in the game 'to be active', and the currently active game.
  setCurrentGame(toBeActive, currentActive) {
    // Some more this binding
    var self = this;

    // This handles the edge case of clicking on the game that is currently active.
    if (toBeActive.id === currentActive.id) {
      // Do nothing if the game you clicked on is already active.
      return;
    }

    // change the status key of each game to what we want.
    toBeActive.status = 'active';
    currentActive.status = 'created';

    // updateGameStatus takes the two games to be updated and returns a promise object
      // that we do nothing with :P, but we need to wait for that to finish before updating the games.
    utils.updateGameStatus(toBeActive, currentActive).then(res => {
      // Then we update the games with the current tournament id
      self.updateGames(self.state.currentTournament.id);
    });
  }

  setCurrentTournament(index, tourneyId) {

    var self = this;
    // Set the state of currentTournament to the tournament that was clicked on.
      // We do this by passing the index of the clicked on item up to this function,
      // then using that index to find the correct tournament in the ongoingTournamentsList.
    this.setState({
      currentTournament: this.state.ongoingTournamentsList[index]
    });
    // When we have a currentTournament, update the games and players.
    this.updateGames(tourneyId, this.updatePlayers);

  }

  toggleStatsView() {
    var self = this;
    this.setState({
      statsView: !this.state.statsView,
      tourneyPlayersList: []
    });
    // call our getAllPlayers
    utils.getAllPlayers(this.state).then(res => {
      self.setState({
        allPlayersList: res
      });
    });
    // and call our getOngoingTournaments
    utils.getOngoingTournaments().then(function(tourneys) {
      self.setState({
        ongoingTournamentsList: tourneys
      });
    });
  }

  togglePongView() {
    var self = this;
    this.setState({
      pongView: !this.state.pongView
    });
  }


  finishTournament() {
    // set our context here.
    var self = this;

    // the sorting for the tournament table should happen on game submits,
      // so that means the first item in the currentTournamentTable array
      // should be the winner of our tournament when we end it!
    var winner = this.state.currentTournamentTable.shift();

    // grab the tournament we are in from the state,
    var tournament = this.state.currentTournament;
    // set the winner for the tournament based on the winner's id
    tournament.winner_id = winner.playerId;

    // That results object will be passed into the put request to the server.
    axios.put('/api/tournaments', tournament)
      .then(function(response) {
        // This (untested) alert definitely doesnt work right now, but is a place holder for some sort of
          // Congradulations to the winner.
        alert('Congratulations to ' + winner.name + ' for winning the ' + tournament.tournament_name + ' tournament!');


        var allPlayas = self.state.allPlayersList.concat(self.state.tourneyPlayersList);


        var uniquePlayas = utils.filterToUniquePlayers(allPlayas);
        // Then we set our currentTournament back to null to go back to the create tournament page.
        self.setState({
          currentTournament: null,
          allPlayersList: uniquePlayas,
          tourneyPlayersList: []
        });

      })
      .then(res => {
        utils.getOngoingTournaments()
          .then(function(tourneys) {
            self.setState({
              ongoingTournamentsList: tourneys,
              currentTournamentTable: []
            });
          });
      })
      .catch(function(err) {
        // A catch in the event the put request fails.
        console.log('FinishTournament Error:', err);
      });
  }

//GameStatsForm calls this function after it has PUT the entered stats in the database.
  updateGames(tourneyId, callback) {

    var self = this;
    utils.getGamesByTourneyId(tourneyId).then(res => {
      self.setState({
        currentTournamentGames: res.games,
        currentGame: res.nextGame
      });
    }).then(res =>{
      utils.getTableForTourney(tourneyId)
        .then(res => {
          self.setState({
            currentTournamentTable: res
          });
        })
        .catch(err => {
          throw err;
        });
    }).then(res => {
      typeof callback === 'function' ? callback(tourneyId, self) : '';
    });
  }

  updatePlayers(tourneyId, context) {
    // After setting the games, we will also want to reset the players so that they are displayed correctly when we set a new currentTournament
    // Slight change here, by adding a dictionary we can make this process O(n) instead of O(2^n).
    var dictionary = {};
    // The dictionary gives us a constant/instant time to check if the id is in the unique id list.
    // This lets us filter down to unique ids without nesting .includes or .indexOf.
    var uniquePlayerIds = [];

    // Here we iterate over the array of game objects to filter them down to unique IDs
    context.state.currentTournamentGames.forEach(function(game) {
      if (dictionary[game.player1_id] === undefined) {
        uniquePlayerIds.push(game.player1_id);
      }
      dictionary[game.player1_id] = 'found';

      if (dictionary[game.player2_id] === undefined) {
        uniquePlayerIds.push(game.player2_id);
      }
      dictionary[game.player2_id] = 'found';

    });

    var idsString = uniquePlayerIds.join('-');

    axios.get('./api/player', {
      params: {
        tournament_players: idsString
      }
    })
    .then(function(playersInCurrentTourney) {
      context.setState({
        tourneyPlayersList: playersInCurrentTourney.data,
      });
    });
  }


  render() {

    // if the stats view is enabled
    if (this.state.statsView) {
      return (
        <div className="background">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">FIFA TOURNAMENT MANAGER</a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#"><span onClick={this.toggleStatsView.bind(this)} >Home</span></a></li>
              <li><a href="#"><span>Stats</span></a></li>
            </ul>
          </nav>
          <div className="container">
            <div className="jumbotron header">
              <h1>VIEW YOUR STATS!</h1>
              <p>
                Check out the lifetime stats of all your added players!
              </p>
            </div>

          </div>

          <div className="row">
            <div className="col-xs-12">
                <h3>.</h3>
                <h3>.</h3>
            </div>
          </div>


          <div className="row">

            <div className="col-xs-1">

            </div>

            <div className="col-xs-10">
              <StatsTable table={this.state.currentTournamentTable} />
            </div>

            <div className="col-xs-1">

            </div>
          </div>
          <div className="well"></div>
          <div className="row">
            <div className="col-xs-2"></div>
            <div className="col-xs-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h1 className="fin">
                    <ul className="nav navbar-foot">
                      <li><a href="#"><span onClick={this.togglePongView.bind(this)} >FIFA</span></a></li>
                      <li><a href="#"><span>PING</span></a></li>
                    </ul>
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-xs-2"></div>
          </div>
        </div>
      );
    } else if (this.state.currentTournament) {
      // render the CurrentTournament app
      return (
        <div className="background">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">FIFA TOURNAMENT MANAGER</a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="/"><span>Home</span></a></li>
              <li><a href="#"><span onClick={this.toggleStatsView.bind(this)}>Stats</span></a></li>
            </ul>
          </nav>
          <div className="container">
            <div className="jumbotron header">
              <h1>GAME TIME!</h1>
              <p>
                Start with your first game below, or click any game to start it!
              </p>
            </div>

          </div>

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <FinishTournament finish={this.finishTournament.bind(this)}/>
            </div>
            <div className="col-md-1"></div>
          </div>

          <div className="row">
            <div className="col-xs-12"></div>
          </div>

          <div className="row">

            <div className="col-xs-1">

            </div>

            <div className="col-xs-5">
              <CurrentTournament state={this.state} updateGames={this.updateGames.bind(this)} setCurrentGame={this.setCurrentGame.bind(this)}/>
            </div>

            <div className="col-xs-5">
              <StatsTable playersList={this.state.tourneyPlayersList} table={this.state.currentTournamentTable} />
            </div>

            <div className="col-xs-1">

            </div>
          </div>
          <div className="well"></div>
          <div className="row">
            <div className="col-xs-2"></div>
            <div className="col-xs-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h1 className="fin">
                    <ul className="nav navbar-foot">  
                      <li><a href="#"><span onClick={this.togglePongView.bind(this)} >FIFA</span></a></li>
                      <li><a href="#"><span>PING PONGss</span></a></li>
                    </ul>
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-xs-2"></div>
          </div>
        </div>
      );
    } else {
      // otherwise render the create tournament app.
      return (
        <div className="background">
          <nav className="navbar navbar-inverse">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">FIFA TOURNAMENT MANAGER</a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#"><span>Home</span></a></li>
              <li><a href="#"><span onClick={this.toggleStatsView.bind(this)}>Stats</span></a></li>
            </ul>
          </nav>

          {/* this container holds the jumbotron */}
          <div className="container">
            <div className="jumbotron header">
              <h1>WELCOME</h1>
              <p>
                Create your tournament below by adding new players or picking from the list on the right!
              </p>
            </div>
          </div>


          {/* This row holds the add player form */}
          <div className="row">
            <div className="col-xs-1"></div>
            <div className="col-xs-4">
                <h3>ADD PLAYER</h3>
                <AddPlayerForm addPlayer={this.addPlayer.bind(this)} />
            </div>
            <div className="col-xs-7"></div>
          </div>


          {/* this row holds both lists of players */}
          <div className="row">
            <div className="col-xs-1">
            </div>

            <div className="col-xs-5">
              {/* this will render out through the Player component into the players that we will make the tournament with */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>CREATE NEW TOURNAMENT</h4>
                </div>
                <div className="panel-body">
                  <StartTournament createTournament={this.createTournament.bind(this)}/>
                  <NewTournamentPlayers players={this.state.tourneyPlayersList} click={this.movePlayer.bind(this)} />
                </div>
              </div>
              <OngoingTournamentsList tourneys={this.state.ongoingTournamentsList} click={this.setCurrentTournament.bind(this)}/>
            </div>

            <div className="col-xs-5">
              {/* this will render out with the existing players in the database, and ones added through the form */}
              <AllPlayersList players={this.state.allPlayersList} click={this.movePlayer.bind(this)}/>
            </div>

            <div className="col-xs-1">
            </div>
          </div>
          <div className="well"></div>
          <div className="row">
            <div className="col-xs-2"></div>
            <div className="col-xs-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h1 className="fin">
                    <ul className="nav navbar-foot">
                      <li><a href="#"><span onClick={this.togglePongView.bind(this)} >FIFA</span></a></li>
                      <li><a href="#"><span>PING PONG</span></a></li>
                    </ul>
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-xs-2"></div>
          </div>
        </div>
      );
    }
  }

}

module.exports = Main;
