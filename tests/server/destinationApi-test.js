/* Disclaimer: I did not write this code. It it from the link below with some modifications */
// https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/server_client_together/tests/server/app-test.js
const request = require('supertest')
const app = require('../../src/server/app')
const rep = require('../../src/server/db/destinationRepository')

beforeAll(() => {
  rep.initWithSomeDestinations()
})

test('Test get all', async () => {
  const response = await request(app).get('/api/destinations')

  expect(response.statusCode).toBe(200)
  expect(response.body.length).toBe(5)
})

test('Test not found destination', async () => {
  const response = await request(app).get('/api/destinations/-3')
  expect(response.statusCode).toBe(404)
})

test('Test retrieve each single destination', async () => {
  const responseAll = await request(app).get('/api/destinations')
  expect(responseAll.statusCode).toBe(200)

  const destinations = responseAll.body
  expect(destinations.length).toBe(5)

  for (let i = 0; i < destinations.length; i++) {
    const res = await request(app).get('/api/destinations/' + destinations[i].id)
    const destination = res.body

    expect(destination.city).toBe(destinations[i].city)
  }
})


test("Delete all destinations", async () =>{

  let responseAll = await request(app).get('/api/destinations');
  expect(responseAll.statusCode).toBe(200);

  const destinations = responseAll.body;
  expect(destinations.length).toBe(5);

  for(let i=0; i<destinations.length; i++){

      const res = await request(app).delete('/api/destinations/'+destinations[i].id);
      expect(res.statusCode).toBe(204);
  }

  responseAll = await request(app).get('/api/destinations');
  expect(responseAll.statusCode).toBe(200);
  expect(responseAll.body.length).toBe(0);
});

// this test doesnt work
test("Update destination", async () => {

  const city = "foo";
  
  const resPost = await request(app)
      .post('/api/destinations')
      .send({ city: city, price: 123, image: "boo", activities: "loo" })
      .set('Content-Type', 'application/json');
  expect(resPost.statusCode).toBe(201);
  const location = resPost.header.location;

  let resGet = await request(app).get(location);
  expect(resGet.statusCode).toBe(200);
  expect(resGet.body.city).toBe(city);


  const modified = "bar";
  const id = location.substring(location.lastIndexOf("/")+1, location.length);

  
  const resPut = await request(app)
      .put(location)
      .send({id:id, city: modified, price: 123, image: "boo", activities: "loo" })
      .set('Content-Type', 'application/json');
  expect(resPut.statusCode).toBe(204);

  
  resGet = await request(app).get(location);
  expect(resGet.statusCode).toBe(200);
  expect(resGet.body.city).toBe(modified);
});