import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import DeleteIcon from '@material-ui/icons/Delete'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import TimelineIcon from '@material-ui/icons/Timeline'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { OauthLogout } from '../actions/oauthAction'
import { Link } from 'react-router-dom'
import { Grid, Container, Modal, TextField, Button } from '@material-ui/core'

import './home.css'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

const Profile = ({ history }) => {
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
      <nav
        className='navbar'
        style={{
          backgroundColor: 'rgb(32,32,32)',
          width: '100%',
          height: 70,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          <IconButton
            className='menuicon'
            onClick={() => setVisiblity((visiblity) => !visiblity)}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon style={{ color: 'grey' }} />
          </IconButton>
          <h3
            className='netbook'
            style={{ color: 'white', display: 'flex', alignItems: 'center' }}
          >
            Netbook
          </h3>
        </div>
        <div className='filterfield'>
          <TextField
            style={{
              color: 'white',
              backgroundColor: 'rgb(18,18,18)',
              display: 'flex',
            }}
            label='Filter'
            fullWidth
            margin='normal'
            // onChange={}
            size='small'
            variant='outlined'
            InputProps={{
              className: classes.multilineColor,

              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className='gbtn' style={{ display: 'flex', alignItems: 'center' }}>
          <GoogleLogout
            className='gg'
            color='white'
            theme='dark'
            clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </div>
      </nav>
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
        <div
          className={visible ? 'showsidebar' : 'hidesidebar'}
          style={{
            marginTop: 15,
            marginLeft: 12,
            borderRadius: 8,

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            height: 'calc(100vh - 100px)',
            transition: '0.3s',
            // position: 'absolute',
            // zIndex: 1,
            // height: '100vh',
            // justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
        >
          <div
            className='firsticon'
            style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}
          >
            <IconButton color='inherit' aria-label='open drawer'>
              <TimelineIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Graph View</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' aria-label='open drawer'>
              <AddIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Add Node</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' aria-label='open drawer'>
              <TrendingFlatIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Add Edge</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' aria-label='open drawer'>
              <SearchIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Queries</p>
          </div>
          <Link to='/feed'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit' aria-label='open drawer'>
                <FormatListBulletedIcon style={{ color: 'grey' }} />
              </IconButton>
              <p className={visible ? 'slide' : 'hidetext'}>Feed View</p>
            </div>
          </Link>
          <Link to='/profile'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit' aria-label='open drawer'>
                <PersonIcon style={{ color: 'grey' }} />
              </IconButton>
              <p className={visible ? 'slide' : 'hidetext'}>Profile</p>
            </div>
          </Link>
        </div>
        <div style={{ marginTop: 15, marginLeft: 16, display: 'flex' }}>
          <div style={{}}>
            <img
              src={oauth.imageUrl}
              alt='my-img'
              style={{ marginBottom: 8, borderRadius: 48 }}
            />
            <h5 style={{ marginBottom: 8, fontSize: 15 }}>
              Name: <span style={{ fontWeight: 'normal' }}>{oauth.name}</span>
            </h5>
            <h5 style={{ marginBottom: 8, fontSize: 15 }}>
              Email: <span style={{ fontWeight: 'normal' }}>{oauth.email}</span>
            </h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
