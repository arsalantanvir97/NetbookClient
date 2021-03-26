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
import ClearIcon from '@material-ui/icons/Clear'

import IconButton from '@material-ui/core/IconButton'

import { GoogleLogout } from 'react-google-login'
import {
  Grid,
  Container,
  Modal,
  TextField,
  Button,
  Fab,
} from '@material-ui/core'

const Profile = ({ props, history }) => {
  const [visible, setVisiblity] = useState(false)
  const [openViewNode, setOpenViewNode] = useState(false)
  const [modalStyle] = useState(getModalStyle)

  const { innerWidth, innerHeight } = window
  console.log('innerwidth', innerWidth)
  function getModalStyle() {
    const { innerWidth, innerHeight } = window

    console.log(innerWidth)
    let top = 50,
      left = innerWidth < 600 ? 0 : 50
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${left}%, -${top}%)`,
    }
  }
  const dispatch = useDispatch()
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: innerWidth > 600 ? 300 : '100%',

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto !important',
      top: '50%',
    },
    multilineColor: {
      color: 'white',
    },
    linkroot: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }))
  const handleOpenViewNode = () => {
    setOpenViewNode(true)
  }
  const handleClose = () => {
    setOpenViewNode(false)
  }

  const classes = useStyles()
  const logout = () => {
    dispatch(OauthLogout())
    history.push('/')
  }
  const handlefunc = () => {
    handleOpenViewNode()
  }
  const boddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 id='simple-modal-title'>Quota Status</h2>
        <IconButton
          onClick={handleClose}
          color='inherit'
          aria-label='open drawer'
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: 'grey' }} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>AI Queries</p>
        <h5>
          {oauth?.AIQueries}/{oauth?.packageid?.AIQueries}
        </h5>
      </div>
      <div style={{ height: '10px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Nodes</p>
        <h5>
          {nodde?.nodes?.length}/{oauth?.packageid?.Nodes}
        </h5>
      </div>
      <div style={{ height: '10px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>Edges</p>
        <h5>
          {nodde?.links?.length}/{oauth?.packageid?.Edges}
        </h5>
      </div>
    </div>
  )

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
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: 9,
              }}
            >
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={handlefunc}
              >
                <div>View Quota</div>
              </Button>
              <span className='gbtnn'>
                <GoogleLogout
                  className='gg'
                  color='white'
                  theme='dark'
                  clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
                  buttonText='Logout'
                  onLogoutSuccess={logout}
                ></GoogleLogout>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openViewNode}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
      >
        {boddy}
      </Modal>
    </>
  )
}

export default Profile
