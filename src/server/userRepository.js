/* 
    Disclaimer: I did not write this code. It is from the link below, with minor chantes.
    https://github.com/arcuri82/web_development_and_api_design/blob/master/les09/authentication/src/server/repository.js
*/
const users = new Map()

function getUser(id) {
  return users.get(id)
}

function verifyUser(id, password) {
  const user = getUser(id)

  if (!user) {
    return false
  }

  return user.password === password
}

// this function is only being used to create the foo user
function createUser(id, password) {
  if (getUser(id)) {
    return false
  }

  const user = {
    id: id,
    password: password,
  }

  users.set(id, user)
  return true
}

// foo user to be used for testing
function createFirstAgent() {
  createUser('agent', 'agent')
}

module.exports = { getUser, verifyUser, createUser, createFirstAgent }
