const app = require('./app')
const destinationRepository = require('./db/destinationRepository')

const port = process.env.PORT || 8080

app.listen(port, () => {
  destinationRepository.initWithSomeDestinations()
  console.log(`Listening on port ${port}`)
})
