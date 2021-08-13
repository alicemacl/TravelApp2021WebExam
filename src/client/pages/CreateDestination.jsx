import React from 'react'
import { withRouter } from 'react-router'
import Destination from '../components/Elements/Destination'
import ShowError from '../components/Elements/ShowError'

const CreateDestination = ({ userId }) => {
  const onOk = async (city, price, image, destinationId, activities) => {
    const url = 'api/destinations'

    const payload = { city, price, image, activities }

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
      return false
    }

    return response.status === 201
  }

  if (!userId) return <ShowError />
  else
    return (
      <div className="form-container">
        <h2>Create a new destination</h2>
        <Destination city={''} price={''} image={''} activities={''} ok="Create" okCallBack={onOk} />
      </div>
    )
}

export default withRouter(CreateDestination)
