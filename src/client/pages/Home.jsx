import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const Home = ({ userId }) => {
  const [destinations, setDestinations] = useState([])
  const [error, setError] = useState(null)

  async function fetchDestinations() {
    const url = '/api/destinations'

    let response
    let payload
    try {
      response = await fetch(url)
      payload = await response.json()
    } catch (error) {
      setError('Error fetching destinations ' + response.status)
      setDestinations(null)
      return error
    }

    if (response.status === 200) {
      setError(null)
      setDestinations(payload)
    } else {
      setError('Error fetching destinations ' + response.status)
      setDestinations(null)
    }
  }

  async function deleteDestination(id) {
    const url = '/api/destinations/' + id

    let response

    try {
      response = await fetch(url, { method: 'delete' })
    } catch (error) {
      alert('delete operation failed:' + error)
      return false
    }

    if (response.status !== 204) {
      alert('delete operation failed: status code: ' + response.status)
      return false
    }

    fetchDestinations()

    return true
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  if (error !== null) {
    return <div>Error: {error}</div>
  } else {
    return (
      <>
        <div>
          <h1>Available trips</h1>
        </div>
        <div className="destinations-container">
          {destinations.map((item) => (
            <div className="single-destination" key={item.id}>
              <Link to={`/single-destination?destinationId=${item.id}`}>
                <div className="single-destination-image">
                  <img src={item.image} />
                </div>
              </Link>

              <h3 className="single-destination-heading">{item.city}</h3>
              <div className="single-destination-price">Price from {item.price}kr</div>
              <div>Activities: {item.activities}</div>
              {userId && (
                <div className="margin-top-1">
                  <button className="single-destination-button" onClick={() => deleteDestination(item.id)}>
                    Delete me
                  </button>
                  <Link to={'/edit-destination?destinationId=' + item.id}>
                    <button className="single-destination-button">Edit</button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default withRouter(Home)
