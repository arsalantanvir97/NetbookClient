import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OauthLogout } from '../actions/oauthAction'

import './home.css'
import {
  makeStyles,
} from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Query = ({ history }) => {
  const [visible, setVisiblity] = useState(false)
  const dispatch = useDispatch()
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode

  const useStyles = makeStyles((theme) => ({
    multilineColor: {
      color: 'white',
    },
  }))

  const classes = useStyles()
  const logout = () => {
    dispatch(OauthLogout())
    history.push('/')
  }
  console.log('he', oauth)
  return (
    <>
      <Navbar setVisiblity={setVisiblity} logout={logout} />
      <div
        className='feedviewside'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          height: 'calc(100vh - 70px)',
          backgroundColor: 'rgba(230, 230, 230,1)',
        }}
      >
        <Sidebar visible={visible} />
        <div style={{ marginTop: 15, marginLeft: 16, display: 'flex' }}>
          <div style={{}}>
            Query View
          </div>
        </div>
      </div>
    </>
  )
}

export default Query
