require(TEST_HELPER); // <--- This must be at the top of every test file.

const driver = require(__client + '/models/lib/axios_model.js');

// NOTE: Axios is required here to pass it to the mock adapter function.
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This lets us test our axios requests easily.
let mock = new MockAdapter(axios)

mock.onGet('/test').reply((config) => {
  if (!config.params) {
    return [200, Mock_Data.test.existing]
  } else if (config.params.id === 1) {
    return [200, Mock_Data.test.existing[0]]
  } else if (config.params.id === 3) {
    return [200, Mock_Data.test.existing[2]]
  }
})
.onPost('/test').reply(201, 'Created')
.onPut('/test').reply((config) => {
  return [202, {id: 1}]
});


describe('axios model', function() {

  it('should have a create method', function() {
    expect(typeof driver.create).to.equal('function');
  })

  let route = '/test';

  let testModel = driver.create(route);

  it('should create a new front end model', function() {
    expect(testModel).to.have.property('route');
    expect(testModel.route).to.equal(route);
  })

  it('should only accept a route as a string', function() {

    expect(driver.create.bind(driver, 4)).to.throw(TypeError, /must be a string/)
  })

  describe('all method', function() {
    it('should have an "all" method', function () {
      expect(typeof testModel.all).to.equal('function');
    })

    it('should respond with all the data for the defined model', function(done) {

      testModel.all().then(res => {
        expect(res).to.deep.equal(Mock_Data.test.existing)
        done()
      }).catch(err => {
        throw err
        done()
      })
    })

  })

  describe('create method', function() {
    it('should have an "create" method', function () {
      expect(typeof testModel.create).to.equal('function');
    })

    it('should respond with 201 and "Created" when called', function(done) {

      let attrs = {
        id: 3,
        Laborum: 'Pariatur ad non nostrud incididunt eiusmod',
        veniam: 'aliquip sint ipsum labore exercitation amet eu.'
      }

      testModel.create(attrs).then(res => {
        expect(res.status).to.equal(201);
        expect(res.data).to.equal('Created');
        done();
      }).catch(err => {
        throw err
        done();
      })
    })

  })

  describe('findById method', function() {
    it('should have an "findById" method', function () {
      expect(typeof testModel.findById).to.equal('function');
    })

    it('should respond with 200 when called with an attributes object', function(done) {

      return testModel.findById({id: 1}).then(res => {
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('id');
        expect(res.data).to.have.property('laborum');
        done();
      }).catch(err => {
        throw err
        done();
      })
    })

  })

  describe('updateOne method', function() {

    it('should have a "updateOne" method', function() {
      expect(typeof testModel.updateOne).to.equal('function')
    })

    it('should respond with 202 and the item id', function() {
      return testModel.updateOne(Mock_Data.test.updated).then(res => {

        let body = res.data

        expect(res.status).to.equal(202)
        expect(body).to.have.property('id')
        expect(body.id).to.equal(1)
      })
    })
  })

})
