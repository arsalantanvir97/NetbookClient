import React, { useState, useRef, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import TuneIcon from '@material-ui/icons/Tune'
import Checkbox from '@material-ui/core/Checkbox'
import Alert from '@material-ui/lab/Alert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { GoogleLogout } from 'react-google-login'
import './../screens/home.css'
import {
  Searchnode,
  Clearnode,
  Searchedge,
  Clearedge,
  Searchnodeedge,
  Searchedgeand,
  Searchnodeand,
  Searchedgeor,
  Searchnodeor,
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

  const nodesimpsearch = useRef('')

  const [edgeval, setEdgeval] = useState('')
  const [nodeval, setNodeval] = useState('')
  const [searchedge, setSearchedge] = useState('')
  const [msgg, setMsgg] = useState('')

  const [msggg, setMsggg] = useState('')
  const [checked, setChecked] = useState(false)
  const [checker, setChecker] = useState(false)
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
  useEffect(() => {
    console.log('checked', checked)
  }, [checked])
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
    alertroot: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      position: 'fixed',
      top: innerWidth > 600 ? '23%' : '19%',
      left: innerWidth > 600 ? '29%' : '19%',
    },
    multilineColor: {
      color: 'white',
    },
    multilineColors: {
      color: 'black',
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

  const onnodeChange = (e) => {
    nodesearch.current.value = e.target.value
    if (e.nativeEvent.data === null) {
      dispatch(
        Searchnodeedge(nodesearch.current.value, edgesearch.current.value)
      )
      console.log('delete')
    } else if (nodesearch.current.value !== '') {
      dispatch(Searchnode(e.target.value))
    }
  }

  const onChange = (e) => {
    nodesearch.current.value = e.target.value
    console.log('1', nodesearch.current.value, edgesearch.current.value)
    let namess = nodesearch.current.value
    let node1
    let node2
    let numnod
    if (namess.includes('^')) {
      var charRepeats = function (str) {
        return (numnod = (str.match(/\^/g) || []).length)
      }
      charRepeats(namess)
      console.log('numnod', numnod)
      if (numnod > 1) {
        toast.error('You can only type ^ once', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        // setMsgg('You can only type ^ once')

        console.log('abbc')
      }
      node1 = namess.split('^')[0]
      node2 = namess.split('^')[1]

      dispatch(Searchnodeand(node1, node2, checked))
      console.log('names', node1, node2)
    }
    if (namess.includes('|')) {
      var charRepeats = function (str) {
        return (numnod = (str.match(/\|/g) || []).length)
      }
      charRepeats(namess)
      console.log('numnod', numnod)
      if (numnod > 1) {
        toast.error('You can only type | once', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        console.log('abbbc')
      }
      node1 = namess.split('|')[0]
      node2 = namess.split('|')[1]

      if (!!node1 && !!node2) {
        dispatch(Searchnodeor(node1, node2, checked))
      }
      console.log('namesss', node1, node2)
    } else if (e.nativeEvent.data === null) {
      dispatch(
        Searchnodeedge(
          nodesearch.current.value,
          edgesearch.current.value,
          checked
        )
      )
      console.log('delete')
    } else if (
      nodesearch.current.value !== '' &&
      !nodesearch.current.value.includes('^') &&
      !nodesearch.current.value.includes('|')
    ) {
      dispatch(Searchnode(e.target.value, checked))
    } else {
      // dispatch(Clearnode())
    }
  }
  const onedgeChange = (e) => {
    edgesearch.current.value = e.target.value
    console.log('2', nodesearch.current.value, edgesearch.current.value)
    let names = edgesearch.current.value
    let edge1
    let edge2
    let numedg
    if (names.includes('^')) {
      var charRepeats = function (str) {
        return (numedg = (str.match(/\^/g) || []).length)
      }
      charRepeats(names)
      console.log('numedg', numedg)
      if (numedg > 1) {
        toast.error('You can only type ^ once', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('abbc')
      }
      edge1 = names.split('^')[0]
      edge2 = names.split('^')[1]

      dispatch(Searchedgeand(edge1, edge2, checked))
      console.log('names', edge1, edge2)
    }
    if (names.includes('|')) {
      var charRepeats = function (str) {
        return (numedg = (str.match(/\|/g) || []).length)
      }
      charRepeats(names)
      console.log('numedg', numedg)
      if (numedg > 1) {
        toast.error('You can only type | once', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        console.log('abbbc')
      }
      edge1 = names.split('|')[0]
      edge2 = names.split('|')[1]

      if (!!edge1 && !!edge2) {
        dispatch(Searchedgeor(edge1, edge2, checked))
      }
      console.log('namesss', edge1, edge2)
    }

    if (e.nativeEvent.data === null) {
      dispatch(
        Searchnodeedge(
          nodesearch.current.value,
          edgesearch.current.value,
          checked
        )
      )
      console.log('delete')
    } else if (
      edgesearch.current.value !== '' &&
      !edgesearch.current.value.includes('^') &&
      !edgesearch.current.value.includes('|')
    ) {
      dispatch(Searchedge(e.target.value, checked))
    } else {
      // dispatch(Clearedge())
    }
  }

  const onkeydownEdge = (e) => {
    if (e.keyCode === 8) {
      console.log('delete')
    } else if (edgesearch.current.value !== '') {
      dispatch(Searchedge(e.target.value))
    } else {
      dispatch(Clearedge())
    }
  }
  const onkeydownNode = (e) => {
    if (e.keyCode === 8) {
      console.log('delete')
    } else if (nodesearch.current.value !== '') {
      dispatch(Searchnode(e.target.value))
    } else {
      dispatch(Clearnode())
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
            className='menuicons'
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
        {(props.page === 'Links' || props.page === 'Feed') && (
          <div style={{ display: 'flex' }} className='filterfield'>
            <TextField
              style={{
                color: 'white',
                backgroundColor: 'rgb(18,18,18)',
                display: 'flex',
              }}
              label='Node Filter'
              fullWidth
              margin='normal'
              ref={nodesimpsearch}
              onChange={onnodeChange}
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
            {props.page === 'Links' && (
              <IconButton
                className='menuicon'
                onClick={() => props.setVissiblity((vissiblity) => !vissiblity)}
                color='inherit'
                aria-label='open drawer'
              >
                <TuneIcon style={{ color: 'grey' }} />
              </IconButton>
            )}
          </div>
        )}

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
      {/* <div className={classes.alertroot}>
        {msgg ? (
          <Alert severity='error'>{msgg}</Alert>
        ) : msggg ? (
          <Alert severity='error'>{msggg}</Alert>
        ) : null}
      </div> */}
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        className={props.vissible ? 'searchbars' : 'searchbars hidesearchbars'}
      >
        <div style={{ flex: 1 }}>
          <TextField
            style={{ width: 'calc(100% - 7px)' }}
            label='Filter Node'
            margin='normal'
            type='text'
            ref={nodesearch}
            onChange={onChange}
            // onKeyDown={onkeydownNode}
            // onChange={}
            size='small'
            variant='outlined'
            InputProps={{
              className: classes.multilineColors,

              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            style={{ width: 'calc(100% - 7px)' }}
            label='Filter Edge'
            margin='normal'
            ref={edgesearch}
            onChange={onedgeChange}
            disabled={checker}
            // onKeyDown={onkeydownEdge}
            // onChange={}
            size='small'
            variant='outlined'
            InputProps={{
              className: classes.multilineColors,

              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color='default'
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
        </div>
      </div>
    </>
  )
}

export default Navbar
