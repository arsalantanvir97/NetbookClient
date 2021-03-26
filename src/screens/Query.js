import React, { useState, useEffect } from 'react'
import { OauthLogout } from '../actions/oauthAction'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import InputLabel from '@material-ui/core/InputLabel'
import { Link } from 'react-router-dom'
import Select from '@material-ui/core/Select'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import './home.css'
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { AIQueriesfetch } from '../actions/oauthAction'

import {
  Grid,
  Container,
  Modal,
  TextField,
  Button,
  Fab,
} from '@material-ui/core'

const Query = ({ props, history }) => {
  const dispatch = useDispatch()

  const [modalStyle] = useState(getModalStyle)
  const [visible, setVisiblity] = useState(false)
  const [query, setQuery] = useState([])
  const [queryparams, setQueryparams] = useState('')
  const [open, setOpen] = useState(false)
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode
  const { innerWidth, innerHeight } = window

  function getModalStyle() {
    const { innerWidth, innerHeight } = window

    let top = 50,
      left = innerWidth < 600 ? 0 : 50
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${left}%, -${top}%)`,
    }
  }

  function getModalStyle() {
    const { innerWidth, innerHeight } = window

    let top = 50,
      left = innerWidth < 600 ? 0 : 50
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${left}%, -${top}%)`,
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log('hhs', oauth)
  }, [loading])

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: innerWidth > 600 ? 500 : '100%',

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: 'calc(100vh - 100px)',
      overflow: 'auto !important',
      top: '50%',
    },
    multilineColor: {
      color: 'white',
    },
    formControl: {
      // margin: theme.spacing(1),
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
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    fieldroot: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }))

  const classes = useStyles()
  const logout = () => {
    dispatch(OauthLogout())
    history.push('/')
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ textAlign: 'center' }} id='simple-modal-title'>
          Limit Reached
        </h2>
        <IconButton
          onClick={handleClose}
          color='inherit'
          aria-label='open drawer'
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: 'grey' }} />
        </IconButton>
      </div>
      <p style={{ fontWeight: 400, fontSize: 19 }}>
        Please upgrade your subsciption limit has been reached,please upgrade or
        wait for your quota limit to be refreshed
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Link to='/payment'>
          <Button
            style={{ backgroundColor: 'rgb(32, 32, 32)', color: 'white' }}
          >
            Upgrade
          </Button>
        </Link>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: 'rgb(32, 32, 32)',
            color: 'white',
            marginLeft: '18px',
          }}
        >
          Close
        </Button>
      </div>
    </div>
  )

  const submitHandler = (e) => {
    e.preventDefault()
    if (oauth?.AIQueries < oauth?.packageid?.AIQueries) {
      console.log('submitted')
      dispatch(AIQueriesfetch(oauth?._id, queryparams))
    } else handleOpen()
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
            <form onSubmit={submitHandler}>
              <FormControl
                className={classes.formControl}
                variant='outlined'
                size='small'
              >
                <InputLabel id='demo-simple-select-label'>Query</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                >
                  {/* {selectimport.map((si) => (
                  // <MenuItem value={idd._id}>{idd.id}</MenuItem>
                ))} */}
                </Select>
              </FormControl>

              <div style={{ height: 9 }}></div>
              <TextField
                style={{ color: 'black', width: '100%', marginTop: 9 }}
                id='outlined-basic'
                size='small'
                label='Query Params'
                value={queryparams}
                onChange={(e) => setQueryparams(e.target.value)}
                variant='outlined'
              />
              <div style={{ height: 9 }}></div>
              <TextField
                style={{
                  color: 'black',
                  width: '100%',
                  marginTop: 9,

                  pointerEvents: 'none',
                }}
                className={classes.fieldroot}
                id='outlined-multiline-static'
                multiline
                rows={4}
                label='Waiting for response'
                value={oauth.msg ? oauth?.msg?.message : null}
                // defaultValue='Default Value'
                variant='outlined'
              />
              <div style={{ height: 9 }}></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type='submit'
                  style={{
                    backgroundColor: 'rgb(32,32,32)',
                    color: 'white',
                    marginTop: 9,
                  }}
                >
                  Ask
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
      >
        {body}
      </Modal>
    </>
  )
}

export default Query
