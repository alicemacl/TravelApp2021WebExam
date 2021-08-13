/* Disclaimer: I did not write this code. It is taken from the link below with minor modifications */
/* https://github.com/arcuri82/web_development_and_api_design/blob/master/les09/authentication/src/server/routes.js */
const express = require('express')
const passport = require('passport')
const userRepository = require('../db/userRepository')
const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(204).send()
})

router.post('/signup', function (req, res) {
  const created = userRepository.createUser(req.body.userId, req.body.password)

  if (!created) {
    res.status(400).send()
    return
  }
  passport.authenticate('local')(req, res, () => {
    req.session.save((err) => {
      if (err) {
        res.status(500).send()
      } else {
        res.status(201).send()
      }
    })
  })
})

router.post('/logout', function (req, res) {
  req.logout()
  req.session.destroy()
  res.status(204).send()
})

router.get('/user', function (req, res) {
  if (req.user) {
    res.json({
      userId: req.user.id,
    })
    return
  }

  res.status(401).send()
})

module.exports = router
