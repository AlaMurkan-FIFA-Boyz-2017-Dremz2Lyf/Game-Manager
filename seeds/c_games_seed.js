require(TEST_HELPER);

var games = Mock_Data.games.map(function(game) {
  return {player1_id: game.player1_id, player2_id: game.player2_id, tournament_id: game.tournament_id};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('games').insert(games)
  );
};
