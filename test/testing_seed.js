
// These maps take the Mock data and return the data we would expect from a post request
var playerNames = Mock_Data.players.map(function(playerObj) {
  return {username: playerObj.username};
});

var tourneyNames = Mock_Data.tournaments.map(function(tourney) {
  return {tournament_name: tourney.tournament_name};
});

var games = Mock_Data.games.map(function(game) {
  return {player1_id: game.player1_id, player2_id: game.player2_id, tournament_id: game.tournament_id};
});

exports.seed = function(knex, Promise) {
// Deletes ALL existing entries
  return Promise.all([
    knex('players').del()
.then(function () {
  return knex('players').insert(playerNames);
}),

  ]);
};
