require(TEST_HELPER);

var playerNames = Mock_Data.playerObjs.map(function(playerObj) {
  return {username: playerObj.username};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('players').del(),
    knex('players').insert(playerNames)
  );
};
