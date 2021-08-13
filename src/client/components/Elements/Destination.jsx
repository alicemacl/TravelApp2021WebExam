import React, { useState } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'

const Destination = (props) => {
  const [city, setCity] = useState(props.city)
  const [price, setPrice] = useState(props.price)
  const [image, setImage] = useState(props.image)
  const [activities, setActivities] = useState(props.activities)

  const { ok, destinationId } = props

  const history = useHistory()

  const onFormSubmit = async (e) => {
    e.preventDefault()
    const completed = await props.okCallBack(city, price, image, activities, destinationId)

    if (completed) {
      history.push('/')
    } else {
      alert('Failed to create new destination')
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleImageChange = (e) => {
    setImage(e.target.value)
  }

  const handleActivityChange = (e) => {
    setActivities(e.target.value)
  }

  return (
    <div className="form-area">
      <form onSubmit={onFormSubmit}>
        <div className="form-field-area">
          <div className="input-label">City:</div>
          <input placeholder="Please provide a city name" value={city} onChange={handleCityChange} />

          <div className="input-label">Price:</div>
          <input placeholder="Please provide a price" value={price} onChange={handlePriceChange} />

          <div className="input-label">Image url:</div>
          <input placeholder="Please provide a url to the image" value={image} onChange={handleImageChange} />

          <div className="input-label">Activities:</div>
          <input placeholder="Please provide activities" value={activities} onChange={handleActivityChange} />
        </div>
        <div className="margin-auto">
          <button className="submit-button margin-bottom-1" type="submit">
            {ok}
          </button>
          <Link to="/">
            <button className="submit-button">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Destination)
