import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OauthLogout } from '../actions/oauthAction'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import './home.css'
import { Link as Links } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleLogout } from 'react-google-login'

const Profile = ({ props, history }) => {
  const [visible, setVisiblity] = useState(false)
  const { innerWidth, innerHeight } = window
  console.log('innerwidth', innerWidth)

  const dispatch = useDispatch()
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode

  const useStyles = makeStyles((theme) => ({
    multilineColor: {
      color: 'white',
    },
    linkroot: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <div className='queryform'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={oauth?.imageUrl}
                alt='my-img'
                style={{ marginBottom: 22, borderRadius: 48 }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h5 style={{ marginBottom: 8, fontSize: 16 }}>
                Name: <span style={{ fontWeight: 'normal' }}>{oauth.name}</span>
              </h5>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h5 style={{ marginBottom: 8, fontSize: 16 }}>
                Email:{' '}
                <span style={{ fontWeight: 'normal' }}>{oauth.email}</span>
              </h5>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row !important',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h5 style={{ fontSize: 16 }}>
                Status:{' '}
                <span style={{ fontWeight: 'normal' }}>
                  {oauth?.packageid?.type}
                </span>
              </h5>
              <span style={{ marginLeft: 7 }}>
                <Typography className={classes.linkroot}>
                  <Links to='/payment'>Change</Links>
                </Typography>
              </span>
            </div>

            <div
              className='gbtnn'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <GoogleLogout
                className='gg'
                color='white'
                theme='dark'
                clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
                buttonText='Logout'
                onLogoutSuccess={logout}
              ></GoogleLogout>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
