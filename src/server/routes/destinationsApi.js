/* Disclaimer: I did not write this code. It is from the link below with minor modifications */
// https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/server_client_together/src/server/app.js

const express = require('express')
const router = express.Router()
const passport = require('passport')

const destinationsRepository = require('../db/destinationRepository')

router.get('/destinations', (req, res) => {
  res.json(destinationsRepository.getAllDestinations())
})

router.get('/destinations/:id', (req, res) => {
  const destination = destinationsRepository.getDestination(req.params['id'])

  if (!destination) {
    res.status(404)
    res.send()
  } else {
    res.json(destination)
  }
})

router.delete('/destinations/:id', (req, res) => {
  const deleted = destinationsRepository.deleteDestination(req.params.id)
  if (deleted) {
    res.status(204)
  } else {
    res.status(404)
  }
  res.send()
})

router.post('/destinations', (req, res) => {
  const dto = req.body

  const id = destinationsRepository.createNewDestination(dto.city, dto.price, dto.image, dto.activities)

  res.status(201)
  res.header('location', '/destinations/' + id)
  res.send()
})

router.put('/destinations/:id', (req, res) => {
  if (req.params.id !== req.body.id) {
    res.status(409)
    res.send()
    return
  }

  const updated = destinationsRepository.updateDestination(req.body)

  if (updated) {
    res.status(204)
  } else {
    res.status(404)
  }
  res.send()
})

module.exports = router
