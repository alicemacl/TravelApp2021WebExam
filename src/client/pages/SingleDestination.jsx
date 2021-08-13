import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const SingleDestination = () => {
  const [destination, setDestination] = useState('')
  const [error, setError] = useState(null)

  const destinationId = new URLSearchParams(window.location.search).get('destinationId')

  if (destinationId === null) {
    setError('Unspecified destination ID')
  }

  useEffect(() => {
    if (error === null) {
      fetchDestination()
    }
  }, [])

  async function fetchDestination() {
    const url = '/api/destinations/' + destinationId

    let response
    let payload

    try {
      response = await fetch(url)
      payload = await response.json()
    } catch (error) {
      setError('Error fetching destinations ' + response.status)
      setDestination(null)
      return error
    }

    if (response.status === 200) {
      setError(null)
      setDestination(payload)
    } else {
      setError('Error fetching destinations ' + response.status)
      setDestination(null)
    }
    console.log(payload)
  }
  return (
    <>
      <h1>{destination.city}</h1>
      <div>{destination.price}</div>
      <img src={destination.image} />
      <div>{destination.activities}</div>
      {/* <div>{destination.activities[1].title}</div> */}
    </>
  )
}

export default withRouter(SingleDestination)
