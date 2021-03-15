import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { Route } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import StripeCheckout from 'react-stripe-checkout'
import CircularProgress from '@material-ui/core/CircularProgress'
import HomePage from '../components/HomePage'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  Grid,
  Container,
  Modal,
  TextField,
  Button,
  Fab,
} from '@material-ui/core'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

const stripePromise = loadStripe('pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa')

const Payment = () => {
  const [paymentdata, setPaymentdata] = useState([])
  const [showloader, setShowloader] = useState(true)
  const premiumid = 'price_1IMpnpLSi7LM2Y4Gj69OcvqC'
  const basicid = 'price_1IMazjLSi7LM2Y4Gg8zEo3FY'
  const [open, setOpen] = useState(false)

  const { innerWidth, innerHeight } = window
  const [modalStyle] = useState(getModalStyle)

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
    const paymentAPI = async () => {
      const { data } = await axios.get(
        'https://netbook-server.herokuapp.com/packages'
      )
      setPaymentdata(data)
      console.log('apidata', data)
      console.log('data', paymentdata)
      if (data) {
        setShowloader(false)
      }
    }

    paymentAPI()
  }, [])
  const [paymentone, setPaymentone] = useState(paymentdata[1])
  const useStyles = makeStyles((theme) => ({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    loaderroot: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    pos: {
      marginBottom: 12,
    },
    paper: {
      position: 'absolute',
      width: innerWidth > 600 ? 600 : '100%',
      height: '400px',
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: 'calc(100vh - 200px)',
      // overflow: 'auto !important',
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
  }))
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const handletoken = (token, addresses) => {
    console.log(token, addresses)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ textAlign: 'center' }} id='simple-modal-title'>
          Payment
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
      <div style={{ marginTop: '-215px' }}>
        <Elements stripe={stripePromise}>
          <Route
            render={({ history }) => (
              <HomePage packageid={paymentone} history={history} />
            )}
          />
        </Elements>
      </div>
    </div>
  )

  return (
    <div className='pmtresp'>
      {showloader ? (
        <div className={classes.loaderroot}>
          <CircularProgress
            style={{
              top: '50%',

              position: 'absolute',
              left: '50%',
            }}
          />
        </div>
      ) : (
        <Container>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Card onClick={handleOpen} className='rooot'>
                <Container>
                  <CardContent>
                    <Typography
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        color: 'rgb(133,176,229)',
                        fontWeight: 'normal',
                        marginBottom: 15,
                      }}
                    >
                      {paymentdata[0]?.type}
                    </Typography>

                    <Typography
                      style={{
                        position: 'relative',
                        fontSize: 35,
                        textAlign: 'center',
                      }}
                    >
                      {' '}
                      <span
                        style={{ color: 'rgb(133,176,229)' }}
                        className='euros'
                      >
                        €
                      </span>
                      {paymentdata[0]?.price}
                      <span style={{ fontSize: 30 }}>/</span>
                      <span className='month'>mo</span>
                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(133,176,229)' }}
                        />
                        <p style={{ fontSize: 15 }}>Nodes</p>
                      </div>
                      <p style={{ fontSize: 15 }}> {paymentdata[0]?.Nodes}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(133,176,229)' }}
                        />
                        <p style={{ fontSize: 15 }}>Edges</p>
                      </div>
                      <p style={{ fontSize: 15 }}>{paymentdata[0]?.Edges}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(133,176,229)' }}
                        />
                        <p style={{ fontSize: 15 }}>AI Queries</p>
                      </div>
                      <p style={{ fontSize: 15 }}>
                        {paymentdata[0]?.AIQueries}
                      </p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size='small'></Button>
                  </CardActions>
                </Container>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                onClick={() => {
                  setPaymentone(basicid)
                  console.log('one', paymentone)
                  handleOpen()
                }}
                className='rooot'
              >
                <Container>
                  <CardContent>
                    <Typography
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        color: 'rgb(230,77,95)',
                        fontWeight: 'normal',
                        marginBottom: 15,
                      }}
                    >
                      {paymentdata[1]?.type}
                    </Typography>

                    <Typography
                      style={{
                        position: 'relative',
                        fontSize: 35,
                        textAlign: 'center',
                      }}
                    >
                      {' '}
                      <span
                        style={{ color: 'rgb(230,77,95)' }}
                        className='euros'
                      >
                        €
                      </span>
                      {paymentdata[1]?.price}
                      <span style={{ fontSize: 30 }}>/</span>
                      <span className='month'>mo</span>
                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}
                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(230,77,95)' }}
                        />
                        <p style={{ fontSize: 15 }}>Nodes</p>
                      </div>
                      <p style={{ fontSize: 15 }}>{paymentdata[1]?.Nodes}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(230,77,95)' }}
                        />
                        <p style={{ fontSize: 15 }}>Edges</p>
                      </div>
                      <p style={{ fontSize: 15 }}>{paymentdata[1]?.Edges}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(230,77,95)' }}
                        />
                        <p style={{ fontSize: 15 }}>AI Queries</p>
                      </div>
                      <p style={{ fontSize: 15 }}>
                        {paymentdata[1]?.AIQueries}
                      </p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size='small'></Button>
                  </CardActions>
                </Container>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                onClick={() => {
                  setPaymentone(premiumid)
                  console.log('second', paymentone)
                  handleOpen()
                }}
                className='rooot'
              >
                <Container>
                  <CardContent>
                    <Typography
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        color: 'rgb(170,219,124)',
                        fontWeight: 'normal',
                        marginBottom: 15,
                      }}
                    >
                      {paymentdata[2]?.type}
                    </Typography>

                    <Typography
                      style={{
                        position: 'relative',
                        fontSize: 35,
                        textAlign: 'center',
                      }}
                    >
                      {' '}
                      <span
                        style={{ color: 'rgb(170,219,124)' }}
                        className='euros'
                      >
                        €
                      </span>
                      {paymentdata[2]?.price}
                      <span style={{ fontSize: 30 }}>/</span>
                      <span className='month'>mo</span>
                    </Typography>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(170,219,124)' }}
                        />
                        <p style={{ fontSize: 15 }}>Nodes</p>
                      </div>
                      <p style={{ fontSize: 15 }}>{paymentdata[2]?.Nodes}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(170,219,124)' }}
                        />
                        <p style={{ fontSize: 15 }}>Edges</p>
                      </div>
                      <p style={{ fontSize: 15 }}>{paymentdata[2]?.Edges}</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 18,
                      }}
                    >
                      {''}

                      <div style={{ display: 'flex' }}>
                        <CheckIcon
                          style={{ marginRight: 20, color: 'rgb(170,219,124)' }}
                        />
                        <p style={{ fontSize: 15 }}>AI Queries</p>
                      </div>
                      <p style={{ fontSize: 15 }}>
                        {paymentdata[2]?.AIQueries}
                      </p>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size='small'></Button>
                  </CardActions>
                </Container>
              </Card>
            </Grid>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
          >
            {body}
          </Modal>
          {/* {paymentone ? (
            <Elements stripe={stripePromise}>
              <HomePage packageid={paymentone} />
            </Elements>
          ) : null} */}
        </Container>
      )}
    </div>
  )
}

export default Payment
