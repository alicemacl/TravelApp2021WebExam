/* Disclaimer: I have used most of this code from the link below, with minor changes */
/* https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/server_client_together/src/server/app.js */

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const path = require('path')
const cors = require('cors')
const userRepository = require('./db/userRepository')
const destinationsRepository = require('./db/destinationRepository')

const userApi = require('./routes/userApi')
const destinationsApi = require('./routes/destinationsApi')

const app = express()

if (false) {
  console.log('using CORS to allow all origins')
  app.use(cors())
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* USER SESSION */
app.use(
  session({
    secret: 'a secret to encrypt the session cookies',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.static('public'))

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
    },
    function (userId, password, done) {
      const ok = userRepository.verifyUser(userId, password)

      if (!ok) {
        return done(null, false, { message: 'invalid login' })
      }

      const user = userRepository.getUser(userId)
      return done(null, user)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  const user = userRepository.getUser(id)

  if (user) {
    done(null, user)
  } else {
    done(null, false)
  }
})

app.use(passport.initialize())
app.use(passport.session())

userRepository.createFirstAgent()

/* ROUTES */
app.use('/api', userApi)
app.use('/api', destinationsApi)

app.all('/api*', (req, res) => {
  res.status(404)
  res.send()
})

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
})

module.exports = app
