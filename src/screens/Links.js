import React, { useState, useEffect } from 'react'
// import Sidebar from 'react-sidebar'
// import SlidingPanel from 'react-sliding-side-panel'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogout } from 'react-google-login'
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

import { Grid, Container, Modal, TextField, Button } from '@material-ui/core'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

// import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { OauthLogout } from '../actions/oauthAction'
import TagsInput from 'react-tagsinput'
import './home.css'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { NodeAdd, Nodefetch, EdgeAdd, Edgefetch } from '../actions/nodeAction'
import { Graph } from 'react-d3-graph'

const Links = ({ history }) => {
  const [hid, setHid] = useState(false)
  const [open, setOpen] = useState(false)
  const [openViewNode, setOpenViewNode] = useState(false)
  const [openAddEdge, setOpenAddEdge] = useState(false)
  const [tags, setTags] = useState([])
  const [visi, setVisi] = useState(false)
  const [visible, setVisiblity] = useState(false)
  const [id, setId] = useState('')
  const [type, setType] = useState('')
  const [inputfields, setInputfields] = useState([])
  const [openPanel, setOpenPanel] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popdown, setPopdown] = useState(false)
  const [attributes, setAttributes] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [edgetags, setEdgetags] = useState([])
  const [nodepopup, setNodepopup] = useState([])
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const dispatch = useDispatch()

  const getOauth = useSelector((state) => state.getOauth)
  const { loading: oauthloading, oauth, error: oautherror } = getOauth

  const putNode = useSelector((state) => state.putNode)
  const { loading, node, error: noderror } = putNode
  const getNode = useSelector((state) => state.getNode)
  const { loading: nodeloading, nodde, error: errror } = getNode

  useEffect(() => {
    if (oauth?._id) {
      dispatch(Nodefetch(oauth._id))

      console.log('hellowold', oauth._id)
    }
  }, [])

  useEffect(() => {
    console.log('nodde being updated =>', nodde)
  }, [nodde])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleOpenViewNode = () => {
    setOpenViewNode(true)
  }
  const handleOpenAddEdge = () => {
    setOpenAddEdge(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenViewNode(false)
    setOpenAddEdge(false)
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10
  }

  function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    multilineColor: {
      color: 'white',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))
  const classes = useStyles()
  const handleChange = (tags) => {
    setTags(tags)
  }
  const handleChanges = (edgetags) => {
    setEdgetags(edgetags)
  }

  const handlechangeinput = (index, event) => {
    const values = [...inputfields]
    values[index][event.target.name] = event.target.value
    setInputfields(values)
    setAttributes(inputfields)
  }
  const handleclickfields = () => {
    setInputfields([
      ...inputfields,
      { attributeName: '', attributeValue: '', attributeType: '' },
    ])
  }

  const inputfieldsremove = (index) => {
    const values = [...inputfields]
    values.splice(index, 1)
    setInputfields(values)
  }
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(NodeAdd(oauth._id, id, type, tags, attributes))
    dispatch(Nodefetch(oauth._id))
    handleClose()
    setId('')
    setType('')
    setTags([])
    setInputfields([])
  }
  const submitedgehandler = (e) => {
    e.preventDefault()
    dispatch(EdgeAdd(oauth._id, source, target, edgetags))
    dispatch(Nodefetch(oauth._id))
    handleClose()
    setSource('')
    setTarget('')
    setEdgetags([])
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Add Node</h2>
      <form onSubmit={submitHandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              style={{ color: 'black', width: '100%', marginTop: 9 }}
              id='outlined-basic'
              size='small'
              label='Name'
              value={id}
              onChange={(e) => setId(e.target.value)}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: '100%', marginTop: 9 }}
              id='outlined-basic'
              label='Type'
              size='small'
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: 'black' }}
          value={tags}
          onChange={handleChange}
        />
        <div style={{ height: 9 }}></div>
        {inputfields.map((inputfield, index) => (
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
                  value={inputfield.attributeName}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name='attributeValue'
                  label='Type'
                  size='small'
                  variant='outlined'
                  label='Attribute Value'
                  value={inputfield.attributeValue}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name='attributeType'
                  label='Type'
                  size='small'
                  variant='outlined'
                  label='Attribute Type'
                  value={inputfield.attributeType}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
            </Grid>
            <IconButton
              size='small'
              type='button'
              onClick={() => inputfieldsremove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button type='button' onClick={handleclickfields} color='primary'>
          Add Attribute
        </Button>
        <Button
          type='submit'
          disabled={id === '' || type === '' || tags.length <= 0}
        >
          <div>Add Node</div>
        </Button>
      </form>
    </div>
  )

  const blackTheme = createMuiTheme({
    palette: { primary: { main: '#000000' } },
  })

  const data = {
    nodes: nodde?.nodes || [],
    links: nodde?.links || [],
    // { source: 'Harry', target: 'Sally' },
    // { source: 'Harry', target: 'Alice' },
  }

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 120,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
  }

  const boddy = (
    <div style={modalStyle} className={classes.paper}>
      <h2
        id='simple-modal-title'
        style={{ textAlign: 'center', marginBottom: 8 }}
      >
        View Node
      </h2>
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
    </div>
  )

  const bodddy = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Add Edge</h2>
      <form onSubmit={submitedgehandler}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Source</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                {nodde?.nodes?.map((idd) => (
                  <MenuItem value={idd.id}>{idd.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Target</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                {nodde?.nodes?.map((idd) => (
                  <MenuItem value={idd.id}>{idd.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: 'black' }}
          value={edgetags}
          onChange={handleChanges}
        />
        <Button
          type='submit'
          disabled={source === '' || target === '' || edgetags.length <= 0}
        >
          <div>Add Edge</div>
        </Button>
      </form>
    </div>
  )
  useEffect(() => {
    console.log('hero', nodepopup)
  }, [nodepopup])

  const onClickNode = (nodeId) => {
    handleOpenViewNode()
    setPopup(true)
    const nodedetails = nodde?.nodes?.filter((node) => node.id === nodeId)[0]
    console.log('ab', nodedetails)

    setNodepopup(nodedetails)
  }

  const onClickLink = (source, target) => {
    window.alert(`Clicked link between ${source} and ${target}`)
  }

  const showtheVisiblity = () => {
    setHid(true)
  }

  const onSetSidebarOpen = () => {
    setSidebarOpen(true)
  }

  const showmodal = () => {
    handleOpen()
    setPopup(false)
  }
  const addedgemodal = () => {
    handleOpenAddEdge()
    setPopdown(true)
  }

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
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          <div
            onClick={showmodal}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconButton color='inherit' aria-label='open drawer'>
              <AddIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Add Node</p>
          </div>
          <div
            onClick={addedgemodal}
            style={{ display: 'flex', alignItems: 'center' }}
          >
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' aria-label='open drawer'>
              <PersonIcon style={{ color: 'grey' }} />
            </IconButton>
            <p className={visible ? 'slide' : 'hidetext'}>Profile</p>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {body}
        </Modal>
        <Modal
          open={openViewNode}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {boddy}
        </Modal>
        <Modal
          open={openAddEdge}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {bodddy}
        </Modal>
        <div className='graph'>
          <Graph
            id='graph-id' // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        </div>
      </div>
    </>
  )
}

export default Links
