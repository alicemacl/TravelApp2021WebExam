import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const Header = ({ updateLoggedInUserId, userId }) => {
  const history = useHistory()

  const doLogOut = async () => {
    const url = '/api/logout'

    let response

    try {
      response = await fetch(url, { method: 'post' })
    } catch (error) {
      alert('Failed to connect to server: ' + error)
    }

    if (response.status !== 204) {
      alert('Error when connecting to server: status code: ' + response.status)
    }

    updateLoggedInUserId(null)
    history.push('/')
  }

  const renderLoggedIn = (userId) => (
    <nav className="navbar">
      <div>
        <div className="welcome-text">Welcome, {userId}</div>
        <div>
          <a onClick={doLogOut}>Log out</a>
        </div>
      </div>

      <div className="navigation-links">
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/create-destination">Create destination</Link>
          </li>
        </ul>
      </div>
    </nav>
  )

  const renderNotLoggedIn = () => (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </nav>
  )

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">Travel agency</div>
        {!userId && renderNotLoggedIn()}
        {userId && renderLoggedIn(userId)}
      </div>
    </div>
  )
}

export default withRouter(Header)
