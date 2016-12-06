require(TEST_HELPER);

var tourneyNames = Mock_Data.tournaments.map(function(tourney) {
  return {tournament_name: tourney.tournament_name};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('tournaments').insert(tourneyNames)
  );
};
