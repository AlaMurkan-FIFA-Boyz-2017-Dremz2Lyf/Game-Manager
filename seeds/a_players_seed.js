require(TEST_HELPER);

var playerNames = Mock_Data.playerObjs.map(function(playerObj) {
  return {username: playerObj.username};
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('players').insert(playerNames)
  );
};
