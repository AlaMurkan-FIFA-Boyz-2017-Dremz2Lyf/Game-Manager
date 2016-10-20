require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes = require(__server + '/index.js');

describe('The Server', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('Returns an Array when "get /api/games" is queried with a tournament_id', function * () {

    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
      .get('/api/games?tournament_id=3')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.be.a('array');
      });
  });
});
