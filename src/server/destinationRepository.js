/*    Disclaimer: I did not write all of this code. It is used from below link with minor changed
      https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/server_client_together/src/server/repository.js 
*/

const destinations = new Map()

let counter = 0

function initWithSomeDestinations() {
  destinations.clear()
  counter = 0

  createNewDestination('Stockholm', 887, 'https://picsum.photos/500/500', 'City tours, bar crawl, sightseeing')
  createNewDestination('Oslo', 4433, 'https://picsum.photos/505/505', 'Holmenkollen, Aker brygge, walking')
  createNewDestination('Krakow', 300, 'https://picsum.photos/506/506', 'Tattoo, city tours')
  createNewDestination('Malaga', 1500, 'https://picsum.photos/507/507', 'Swimming, drinking')
  createNewDestination('Praha', 350, 'https://picsum.photos/508/508', 'Shopping, drinking, festivals')
}

function createNewDestination(city, price, image, activities) {
  const id = '' + counter
  counter++

  const destination = {
    id: id,
    city: city,
    price: price,
    image: image,
    activities: activities,
  }

  destinations.set(id, destination)

  return id
}

function deleteDestination(id) {
  return destinations.delete(id)
}

function getDestination(id) {
  return destinations.get(id)
}

function getAllDestinations() {
  return Array.from(destinations.values())
}

function updateDestination(destination) {
  if (!destinations.has(destination.id)) {
    return false
  }

  destinations.set(destination.id, destination)
  return true
}

module.exports = {
  initWithSomeDestinations,
  getAllDestinations,
  createNewDestination,
  getDestination,
  updateDestination,
  deleteDestination,
}
