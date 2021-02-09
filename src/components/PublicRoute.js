import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ component: Component, ...rest }) => {
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth

  return (
    <Route
      {...rest}
      render={(props) =>
        oauth ? <Redirect to='/graph' /> : <Component {...props} />
      }
    />
  )
}

export default PublicRoute
