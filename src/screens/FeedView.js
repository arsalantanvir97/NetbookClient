import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import TagsInput from 'react-tagsinput'
import { OauthLogout } from '../actions/oauthAction'
import { Grid, Container, Modal, TextField, Button } from '@material-ui/core'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { NodeUpdate, NodeDeletion, Nodefetch } from '../actions/nodeAction'
import './home.css'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

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
  const { loading: nodeloading, nodde, error: errror, filterednode } = getNode

  const getOauth = useSelector((state) => state.getOauth)
  const { loading: oauthloading, oauth, error: oautherror } = getOauth
  function rand() {
    return Math.round(Math.random() * 20) - 10
  }
  const { innerWidth, innerHeight } = window

  useEffect(() => {
    console.log('filterednode', filterednode)
  }, [filterednode])

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
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
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
    const filterednodes = nodde?.nodes.filter((node) => node._id === nodeid)[0]
    console.log('ho', filterednodes)
    setNodepopup(filterednodes)
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
        <Grid item xs={6}>
          <p style={{ fontSize: 15 }}>
            Name:
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {' '}
              {nodepopup?.id}
            </span>
          </p>
        </Grid>
        <Grid item xs={6}>
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
      <Navbar setVisiblity={setVisiblity} logout={logout} page={'Feed'} />

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
        {nodeloading ? (
          <div className={classes.rooot}>
            <CircularProgress />
          </div>
        ) : (
          <div className='vertics' style={{ marginTop: 15, marginLeft: 16 }}>
            {filterednode?.length > 0
              ? filterednode?.map((node, id) => (
                  <div key={id} onClick={() => showdetails(node._id)}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 10,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: node?.color,
                          borderRadius: 20,
                          height: 40,
                          width: 40,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white',
                        }}
                      >
                        <p style={{ fontWeight: 500, fontSize: 18 }}>
                          {node.id[0]}
                        </p>
                      </div>
                      <h5 style={{ marginLeft: 8 }}>{node.id}</h5>
                    </div>
                  </div>
                ))
              : nodde?.nodes?.map((node, id) => (
                  <div key={id} onClick={() => showdetails(node._id)}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 10,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: node?.color,
                          borderRadius: 20,
                          minHeight: 40,
                          minWidth: 40,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white',
                        }}
                      >
                        <p style={{ fontWeight: 500, fontSize: 18 }}>
                          {node.id[0]}
                        </p>
                      </div>
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
