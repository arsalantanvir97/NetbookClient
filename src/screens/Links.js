import React, { useState, useEffect } from 'react'
import { GoogleLogout } from 'react-google-login'
import { Grid, Container, Modal, TextField, Button } from '@material-ui/core'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/Button'
// import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { OauthLogout } from '../actions/oauthAction'
import TagsInput from 'react-tagsinput'
import './home.css'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { NodeAdd, Nodefetch } from '../actions/nodeAction'
import { Graph } from 'react-d3-graph'

const Links = () => {
  const [hid, setHid] = useState(false)
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [visi, setVisi] = useState(false)
  const [id, setId] = useState('')
  const [type, setType] = useState('')
  const [inputfields, setInputfields] = useState([])
  const [attributes, setAttributes] = useState([])

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const dispatch = useDispatch()
  const putNode = useSelector((state) => state.putNode)
  const { loading, node, error } = putNode
  const getNode = useSelector((state) => state.getNode)
  const { loading: loadding, nodde, error: errror } = getNode

  useEffect(() => {
    dispatch(Nodefetch())
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
  }))
  const classes = useStyles()
  const handleChange = (tags) => {
    setTags(tags)
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
    dispatch(NodeAdd(id, type, tags, attributes))
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
        <TagsInput value={tags} onChange={handleChange} />
        <div style={{ height: 9 }}></div>
        {inputfields.map((inputfield, index) => (
          <div style={{ width: '100%' }} key={index}>
            <Grid container spacing={1}>
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
              <IconButton
                type='button'
                onClick={() => inputfieldsremove(index)}
              >
                x
              </IconButton>
            </Grid>
          </div>
        ))}
        <Button type='button' onClick={handleclickfields} color='primary'>
          Add Attribute
        </Button>
        <Button type='submit'>Add Node</Button>
      </form>
    </div>
  )

  const blackTheme = createMuiTheme({
    palette: { primary: { main: '#000000' } },
  })

  const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [
      // { source: 'Harry', target: 'Sally' },
      // { source: 'Harry', target: 'Alice' },
    ],
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

  const onClickNode = (nodeId) => {
    window.alert(`Clicked node ${nodeId}`)
  }

  const onClickLink = (source, target) => {
    window.alert(`Clicked link between ${source} and ${target}`)
  }

  const setVisiblity = () => {
    setHid(true)
  }

  const logout = () => {
    dispatch(OauthLogout())
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          className='sidebar'
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            height: '100vh',
            justifyContent: 'space-between',
            backgroundColor: 'lightgrey',
          }}
        >
          <div>
            <h3 style={{ marginBottom: 15 }}>Menu</h3>
            <Container>
              <h4 className='slide' style={{ marginBottom: 10 }}>
                Graph View
              </h4>
              <h4
                onClick={handleOpen}
                className='slide'
                style={{ marginBottom: 10 }}
              >
                Add Node
              </h4>
              <h4 className='slide' style={{ marginBottom: 10 }}>
                Queries
              </h4>
              <h4 className='slide' style={{ marginBottom: 10 }}>
                Real View
              </h4>
              <h4 className='slide' style={{ marginBottom: 10 }}>
                Profile
              </h4>
            </Container>
          </div>

          <div>
            <Container>
              <GoogleLogout
                className='gg'
                color='white'
                theme='dark'
                clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
                buttonText='Logout'
                onLogoutSuccess={logout}
              ></GoogleLogout>
            </Container>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
        >
          {body}
        </Modal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {hid && (
            <TextField
              size='small'
              margin='normal'
              id='outlined-basic'
              label='Filter'
              variant='outlined'
            />
          )}

          <Graph
            id='graph-id' // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        </div>
        <div style={{ textAlign: 'end' }}>
          <ThemeProvider theme={blackTheme}>
            {!hid && (
              <Button
                variant='contained'
                color='primary'
                onClick={setVisiblity}
              >
                Filter
              </Button>
            )}
          </ThemeProvider>
        </div>
      </div>
    </>
  )
}

export default Links
