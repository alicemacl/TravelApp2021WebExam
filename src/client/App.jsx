import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Header from './components/Elements/Header'
import CreateDestination from './pages/CreateDestination'
import EditDestination from './pages/EditDestination'
import SingleDestination from './pages/SingleDestination'
import NotFound from './pages/NotFound'

const App = () => {
  const [userId, setUserId] = useState(null)

  const updateLoggedInUserId = (userId) => {
    setUserId(userId)
  }
  return (
    <Router>
      <Header userId={userId} updateLoggedInUserId={updateLoggedInUserId} />
      <div className="container">
        <Switch>
          <Route exact path="/single-destination">
            <SingleDestination />
          </Route>
          <Route exact path="/edit-destination">
            <EditDestination userId={userId} />
          </Route>
          <Route exact path="/create-destination">
            <CreateDestination userId={userId} />
          </Route>
          <Route exact path="/login">
            <LoginPage userId={userId} updateLoggedInUserId={updateLoggedInUserId} />
          </Route>
          <Route exact path="/">
            <Home userId={userId} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
