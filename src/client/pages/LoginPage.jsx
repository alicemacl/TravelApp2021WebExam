import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'

const LoginPage = ({ userId, updateLoggedInUserId }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const history = useHistory()

  const onUserIdChange = (e) => {
    setUser(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const doLogIn = async () => {
    const url = '/api/login'

    const payload = { userId: user, password: password }

    let response

    try {
      response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      setError('Failed to connect to server: ' + error)
      return
    }
    if (response.status === 401) {
      setError('Invalid credentials')
      return
    }

    if (response.status !== 204) {
      setError('Error when connecting to server: status code ' + response.status)
      return
    }
    setError(null)
    updateLoggedInUserId(user)
    history.push('/')
  }

  if (userId) {
    return (
      <div className="form-container">
        <div className="form-area">You are already logged in</div>
      </div>
    )
  } else {
    return (
      <div className="form-container">
        <div className="form-area">
          <div className="form-heading">Log into the travel handler</div>
          <div className="form-field-area">
            <div className="input-label">User id:</div>
            <input type="text" value={user} onChange={onUserIdChange} />
          </div>
          <div className="form-field-area">
            <div className="input-label">Password:</div>
            <input type="password" value={password} onChange={onPasswordChange} />
          </div>
          <div className="form-error">{error}</div>

          <div className="submit-button margin-bottom-1 margin-auto" onClick={doLogIn}>
            Log In
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginPage)
