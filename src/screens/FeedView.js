import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import Links from '../screens/Links'
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
import TagsInput from 'react-tagsinput'

import Select from '@material-ui/core/Select'
import { OauthLogout } from '../actions/oauthAction'
import { Link } from 'react-router-dom'
import { Grid, Container, Modal, TextField, Button } from '@material-ui/core'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { NodeUpdate, NodeDeletion, Nodefetch } from '../actions/nodeAction'
import './home.css'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

const FeedView = ({ history }) => {
  const [visible, setVisiblity] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [openViewNode, setOpenViewNode] = useState(false)
  const [haveupdatenode, setHaveupdatenode] = useState(false)

  const [updatenodeid, setUpdatenodeid] = useState('')
  const [updatenodetype, setUpdatenodetype] = useState('')
  const [updatenodetags, setUpdatenodetags] = useState([])
  const [updateattributes, setUpdateattributes] = useState([])

  const [updateinputfields, setUpdateinputfields] = useState([])

  const [nodepopup, setNodepopup] = useState([])
  const dispatch = useDispatch()

  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode

  const getOauth = useSelector((state) => state.getOauth)
  const { loading: oauthloading, oauth, error: oautherror } = getOauth
  function rand() {
    return Math.round(Math.random() * 20) - 10
  }
  const { innerWidth, innerHeight } = window

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
  const handleOpenViewNode = () => {
    setOpenViewNode(true)
  }
  const handleClose = () => {
    setOpenViewNode(false)
    setHaveupdatenode(false)
  }

  const handleupdatenode = () => {
    updatethenode()
  }
  const deleteanode = () => {
    dispatch(NodeDeletion(nodepopup?._id))
    handleClose()
  }
  const updatethenode = () => {
    setHaveupdatenode(true)
  }
  const handlenodeChange = (updatenodetags) => {
    setUpdatenodetags(updatenodetags)
  }
  const handlechangeupdateinput = (index, event) => {
    const values = [...updateinputfields]
    values[index][event.target.name] = event.target.value
    setUpdateinputfields(values)
    setUpdateattributes(updateinputfields)
  }
  const updateinputfieldsremove = (index) => {
    const values = [...updateinputfields]
    values.splice(index, 1)
    setUpdateinputfields(values)
  }
  const handleclickupdatefields = () => {
    setUpdateinputfields([
      ...updateinputfields,
      { attributeName: '', attributeValue: '', attributeType: '' },
    ])
  }
  const showdetails = (nodeid) => {
    const filterednode = nodde?.nodes.filter((node) => node._id === nodeid)[0]
    console.log('ho', filterednode)
    setNodepopup(filterednode)
    console.log('hiii', nodepopup)
    handleOpenViewNode()
  }
  const submitupdatenodehandler = (e) => {
    e.preventDefault()

    dispatch(
      NodeUpdate(
        nodepopup?._id,
        oauth?._id,
        updatenodeid,
        updatenodetype,
        updatenodetags,
        updateattributes
      )
    )
    dispatch(Nodefetch(oauth._id))
    handleClose()
  }

  const classes = useStyles()

  const boddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 id='simple-modal-title'>View Node</h2>
        <IconButton
          onClick={handleClose}
          color='inherit'
          aria-label='open drawer'
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: 'grey' }} />
        </IconButton>
      </div>
      <Grid container>
        <Grid xs={6}>
          <p style={{ fontSize: 15 }}>
            Name:
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {' '}
              {nodepopup?.id}
            </span>
          </p>
        </Grid>
        <Grid xs={6}>
          <p style={{ fontSize: 14 }}>
            Type:{' '}
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {' '}
              {nodepopup?.type}
            </span>
          </p>
        </Grid>
      </Grid>
      <div style={{ height: 17 }}></div>
      <p>
        <span style={{ fontSize: 15 }}>Tags:</span>{' '}
        {nodepopup?.tags?.map((tagg) => (
          <>
            <span
              style={{
                display: 'inline !important',
                backgroundColor: 'black',
                color: 'white',
                padding: 3.1,
                paddingLeft: 9,
                paddingRight: 9,
                minWidth: 400,
                marginRight: 3.8,
                borderRadius: 3.3,
                textAlign: 'center',
              }}
            >
              {tagg}
            </span>
          </>
        ))}
      </p>
      <div style={{ height: 17 }}></div>
      {nodepopup?.attributes?.length > 0 ? (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ fontWeight: 400, textAlign: 'left', fontSize: 16 }}>
                Attribute Name
              </th>
              <th style={{ fontWeight: 400, textAlign: 'left', fontSize: 16 }}>
                Attribute Value
              </th>
              <th style={{ fontWeight: 400, textAlign: 'left', fontSize: 16 }}>
                Attribute Type
              </th>
            </tr>
            <div style={{ height: 8 }}></div>
          </thead>
          <tbody>
            {nodepopup?.attributes?.map((att) => (
              <>
                <tr>
                  <td style={{ fontSize: 22 }}>{att.attributeName}</td>
                  <td style={{ fontSize: 22 }}>{att.attributeType}</td>
                  <td style={{ fontSize: 22 }}>{att.attributeValue}</td>
                </tr>

                {/* <Grid
              style={{ display: 'flex', justifyContent: 'space-between' }}
              container
            >
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Name:
                  <span style={{ fontWeight: 500 }}> {att.attributeName} </span>
                </p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Type:
                  <span style={{ fontWeight: 500 }}> {att.attributeType}</span>
                </p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Value:
                  <span style={{ fontWeight: 500 }}> {att.attributeValue}</span>
                </p>
              </Grid>
            </Grid> */}
                <div style={{ height: 12 }}></div>
              </>
            ))}
          </tbody>
        </table>
      ) : null}
      <Button type='button' onClick={handleupdatenode}>
        Edit Node
      </Button>
      <Button type='button' onClick={deleteanode}>
        Delete Node
      </Button>
    </div>
  )

  const bodddddddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 id='simple-modal-title'>Update Node</h2>
        <IconButton
          onClick={handleClose}
          color='inherit'
          aria-label='open drawer'
        >
          <ClearIcon style={{ color: 'grey' }} />
        </IconButton>
      </div>
      <form onSubmit={submitupdatenodehandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              style={{ color: 'black', width: '100%', marginTop: 9 }}
              id='outlined-basic'
              size='small'
              label='Name'
              value={updatenodeid}
              onChange={(e) => setUpdatenodeid(e.target.value)}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: '100%', marginTop: 9 }}
              id='outlined-basic'
              label='Type'
              size='small'
              value={updatenodetype}
              onChange={(e) => setUpdatenodetype(e.target.value)}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: 'black' }}
          value={updatenodetags ? updatenodetags : null}
          onChange={handlenodeChange}
        />
        <div style={{ height: 9 }}></div>
        {updateinputfields?.map((updateinputfield, index) => (
          <div
            style={{ width: '100%', display: 'flex', marginBottom: 8 }}
            key={index}
          >
            <Grid container spacing={1} style={{ flex: 1 }}>
              <Grid item xs={4}>
                <TextField
                  name='attributeName'
                  label='Type'
                  size='small'
                  variant='outlined'
                  label='Attribute Name'
                  value={updateinputfield.attributeName}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name='attributeValue'
                  label='Type'
                  size='small'
                  variant='outlined'
                  label='Attribute Value'
                  value={updateinputfield.attributeValue}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name='attributeType'
                  label='Type'
                  size='small'
                  variant='outlined'
                  label='Attribute Type'
                  value={updateinputfield.attributeType}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
            </Grid>
            <IconButton
              size='small'
              type='button'
              onClick={() => updateinputfieldsremove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button type='button' onClick={handleclickupdatefields} color='primary'>
          Update Attribute
        </Button>
        <Button
          type='submit'
          disabled={
            updatenodeid === '' ||
            updatenodetype === '' ||
            updatenodetags.length <= 0
          }
        >
          <div>Edit Node</div>
        </Button>
      </form>
    </div>
  )

  const logout = () => {
    dispatch(OauthLogout())
    history.push('/')
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
          <Link to='graph'>
            <div
              className='firsticon'
              style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}
            >
              <IconButton color='inherit' aria-label='open drawer'>
                <TimelineIcon style={{ color: 'grey' }} />
              </IconButton>
              <p className={visible ? 'slide' : 'hidetext'}>Graph View</p>
            </div>
          </Link>
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

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' aria-label='open drawer'>
              <FormatListBulletedIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Feed View</p>
          </div>
          <Link to='/profile'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit' aria-label='open drawer'>
                <PersonIcon style={{ color: 'grey' }} />
              </IconButton>
              <p className={visible ? 'slide' : 'hidetext'}>Profile</p>
            </div>
          </Link>
        </div>
        {nodeloading ? (
          <div className={classes.rooot}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ marginTop: 15, marginLeft: 16 }}>
            {nodde?.nodes?.map((node) => (
              <div onClick={() => showdetails(node._id)}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'black',
                      borderRadius: 22,
                      padding: 22,
                    }}
                  ></div>
                  <h5 style={{ marginLeft: 8 }}>{node.id}</h5>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          open={openViewNode}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {boddy}
        </Modal>
        <Modal
          open={haveupdatenode}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {bodddddddy}
        </Modal>
      </div>
    </>
  )
}

export default FeedView
