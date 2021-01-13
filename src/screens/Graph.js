import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { OauthLogout } from '../actions/oauthAction'

const Graph = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(OauthLogout())
  }

  return (
    <div>
      <div style={{ textAlign: 'end' }}>
        <GoogleLogout
          clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
          buttonText='Logout'
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
    </div>
  )
}

export default Graph
