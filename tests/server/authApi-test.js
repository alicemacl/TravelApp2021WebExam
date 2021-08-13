/* Disclaimer: I did not write this code. It is from the link below with minor modifications */
// https://github.com/arcuri82/web_development_and_api_design/blob/master/les09/authentication/tests/server/routes-test.js

const request = require('supertest')
const app = require('../../src/server/app')

let counter = 0

test('Test fail login', async () => {
  const response = await request(app)
    .post('/api/login')
    .send({ userId: 'foo_' + counter++, password: 'bar' })
    .set('Content-type', 'application/json')

  expect(response.statusCode).toBe(401)
})

test('Test fail access data of non-existent user', async () => {
  const response = await request(app).get('/api/user')

  expect(response.statusCode).toBe(401)
})

test('Test create user, but fail get data', async () => {
  const userId = 'foo_' + counter++

  let response = await request(app)
    .post('/api/signup')
    .send({ userId, password: 'bar' })
    .set('Content-Type', 'application/json')

  expect(response.statusCode).toBe(201)

  response = await request(app).get('/api/user')

  expect(response.statusCode).toBe(401)
})

test('Test create user and get data', async () => {
  const userId = 'foo_' + counter++

  const agent = request.agent(app)

  let response = await agent
    .post('/api/signup')
    .send({ userId, password: 'bar' })
    .set('Content-Type', 'application/json')

  expect(response.statusCode).toBe(201)

  response = await agent.get('/api/user')

  expect(response.statusCode).toBe(200)
  expect(response.body.userId).toBe(userId)
  expect(response.body.password).toBeUndefined()
})

test('Test create user, login in a different session and get data', async () => {
  const userId = 'foo_' + counter++

  let response = await request(app)
    .post('/api/signup')
    .send({ userId, password: 'bar' })
    .set('Content-Type', 'application/json')
  expect(response.statusCode).toBe(201)

  const agent = request.agent(app)

  response = await agent.post('/api/login').send({ userId, password: 'bar' }).set('Content-Type', 'application/json')
  expect(response.statusCode).toBe(204)

  response = await agent.get('/api/user')

  expect(response.statusCode).toBe(200)
  expect(response.body.userId).toBe(userId)
  expect(response.body.password).toBeUndefined()
})

test('Test login after logout', async () => {
  const userId = 'foo_' + counter++

  const agent = request.agent(app)

  let response = await agent
    .post('/api/signup')
    .send({ userId, password: 'bar' })
    .set('Content-Type', 'application/json')
  expect(response.statusCode).toBe(201)

  response = await agent.get('/api/user')
  expect(response.statusCode).toBe(200)

  response = await agent.post('/api/logout')
  expect(response.statusCode).toBe(204)

  response = await agent.get('/api/user')
  expect(response.statusCode).toBe(401)

  response = await agent.post('/api/login').send({ userId, password: 'bar' }).set('Content-Type', 'application/json')
  expect(response.statusCode).toBe(204)

  response = await agent.get('/api/user')
  expect(response.statusCode).toBe(200)
})
