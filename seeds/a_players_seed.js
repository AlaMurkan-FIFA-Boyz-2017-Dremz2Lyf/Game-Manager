require(TEST_HELPER);

var playerNames = Mock_Data.playerObjs.slice().map(player => {return {username: player.username}})

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('players').insert(playerNames)
  );
};
