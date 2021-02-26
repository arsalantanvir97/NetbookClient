import React, { useState, useRef, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import TuneIcon from '@material-ui/icons/Tune'
import Checkbox from '@material-ui/core/Checkbox'
import { GoogleLogout } from 'react-google-login'
import './../screens/home.css'
import {
  Searchnode,
  Clearnode,
  Searchedge,
  Clearedge,
} from '../actions/nodeAction'
import { useDispatch, useSelector } from 'react-redux'
const Navbar = (props) => {
  const getNode = useSelector((state) => state.getNode)
  const {
    loading: nodeloading,
    filterednode,
    filterededge,
    nodde,
    error: errror,
  } = getNode

  const { innerWidth, innerHeight } = window

  const nodesearch = useRef('')
  const edgesearch = useRef('')
  const [vissible, setVissiblity] = useState(false)
  const [searchedge, setSearchedge] = useState('')
  const [checked, setChecked] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    if (filterednode === null) {
      nodesearch.current.value = ''
    }
  })
  useEffect(() => {
    if (filterededge === null) {
      edgesearch.current.value = ''
    }
  })
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: innerWidth > 600 ? 600 : '100%',

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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    rooot: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),

        justifyContent: 'center !important',
      },
    },
  }))
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const classes = useStyles()

  const onChange = (e) => {
    if (nodesearch.current.value !== '') {
      dispatch(Searchnode(e.target.value))
    } else {
      dispatch(Clearnode())
    }
  }
  const onedgeChange = (e) => {
    if (edgesearch.current.value !== '') {
      dispatch(Searchedge(e.target.value))
    } else {
      dispatch(Clearedge())
    }
  }

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
            onClick={() => props.setVisiblity((visiblity) => !visiblity)}
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
        <div style={{ display: 'flex' }} className='filterfield'>
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
          <IconButton
            className='menuicon'
            onClick={() => setVissiblity((vissiblity) => !vissiblity)}
            color='inherit'
            aria-label='open drawer'
          >
            <TuneIcon style={{ color: 'grey' }} />
          </IconButton>
        </div>

        <div className='gbtn' style={{ display: 'flex', alignItems: 'center' }}>
          <GoogleLogout
            className='gg'
            color='white'
            theme='dark'
            clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={props.logout}
          ></GoogleLogout>
        </div>
      </nav>
      <div className={vissible ? 'showsearchbars' : 'hidesearchbars'}>
        {' '}
        <TextField
          className='filterr'
          style={{
            color: 'white',
            width: 300,
            backgroundColor: 'rgb(18,18,18)',
            display: 'flex',
          }}
          label='Search Node'
          margin='normal'
          type='text'
          ref={nodesearch}
          onChange={onChange}
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
        <TextField
          className='filterr'
          style={{
            color: 'white',
            width: 300,
            backgroundColor: 'rgb(18,18,18)',
            display: 'flex',
          }}
          label='Search Edge'
          margin='normal'
          ref={edgesearch}
          onChange={onedgeChange}
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
        <Checkbox
          checked={checked}
          onChange={handleChange}
          color='default'
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      </div>
    </>
  )
}

export default Navbar
