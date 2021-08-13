import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Destination from '../components/Elements/Destination'
import ShowError from '../components/Elements/ShowError'

const EditDestination = ({ userId }) => {
  const [error, setError] = useState(null)

  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [activities, setActivities] = useState('')

  const destinationId = new URLSearchParams(window.location.search).get('destinationId')

  if (destinationId === null) {
    setError('Unspecified destination ID')
  }

  useEffect(() => {
    if (error === null) {
      fetchDestination()
    }
  }, [])

  const fetchDestination = async () => {
    const url = '/api/destinations/' + destinationId

    let response
    let payload

    try {
      respose = await fetch(url)
      payload = await response.json()
      console.log(payload)
    } catch (error) {
      setError('ERROR when retrieving destination: ' + error)
      setCity('')
      setPrice('')
      setImage('')
      setActivities('')
      return
    }

    if (response.status === 200) {
      setError(null)
      setCity(payload.city)
      setPrice(payload.price)
      setImage(payload.image)
      setActivities(payload.activity)
    } else {
      setError('Issue with HTTP connetion: status code: ' + response.status)
      setCity('')
      setPrice('')
      setImage('')
      setActivities('')
    }
  }

  const onOk = async (city, price, image, activities, id) => {
    const url = '/api/destinations/' + id

    const payload = { id, city, price, image, activities }

    let response

    try {
      response = await fetch(url, {
        method: 'put',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      return false
    }

    return response.status === 204
  }

  if (!userId) return <ShowError />
  else return (
    <>
      {userId && (
        <>
          <h3>Edit destination</h3>
          <Destination
            city={city}
            price={price}
            image={image}
            activities={activities}
            destinationId={destinationId}
            ok="Update"
            okCallBack={onOk}
          />
        </>
      )}
    </>
  )
}

export default withRouter(EditDestination)
