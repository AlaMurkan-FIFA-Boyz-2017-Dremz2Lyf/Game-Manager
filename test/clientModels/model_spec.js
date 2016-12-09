require(TEST_HELPER); // <--- This must be at the top of every test file.

const driver = require(__client + '/models/lib/axios_model.js');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

let mock = new MockAdapter(axios)


describe('axios driver', function() {

  it('should have a create method', function() {
    expect(typeof driver.create).to.equal('function');
  })

  describe('Test model', function() {

    let testModel = driver.create('/test')

    it('should create a new front end model', function() {

      expect(testModel).to.have.property('methods');
    })

    it('should only accept a route as a string', function() {
      let failedModel = driver.create(4)

      expect(failedModel).to.have.all.keys(['name', 'message'])
      expect(failedModel.name).to.equal('Invalid Argument')
      expect(failedModel.message).to.equal('Route must be a string')
    })

    describe('all method', function() {
      it('should have an "all" method', function () {
        expect(typeof testModel.all).to.equal('function');
      })

      it('should respond with all the data for the defined model', function(done) {
        mock.onGet('/test').reply(200, 'ALL THE TEST DATA!')

        testModel.all().then(res => {
          expect(res.data).to.equal('ALL THE TEST DATA!')
          done()
        }).catch(err => {
          throw err
          done()
        })
      })

    })

    describe('create method', function() {
      it('should have an "create" method', function () {
        expect(typeof testModel.all).to.equal('function');
      })

      it('should respond with 200 and "Created" when called', function(done) {
        mock.onPut('/test').reply(201, 'Created');

        testModel.all().then(res => {
          expect(res.status).to.equal(201);
          expect(res.data).to.equal('Created');
          done();
        }).catch(err => {
          throw err
          done();
        })
      })

    })

    it('should have a "findBy" method', function() {
      expect(typeof testModel.findBy).to.equal('function')
    })

    it('should have a "updateOne" method', function() {
      expect(typeof testModel.updateOne).to.equal('function')
    })

  })

})

describe('game model', function() {

  describe('all method', function() {

    // let games = driver.create('games', 'http://localhost:4000/')


  })

})
