import React, { useState } from 'react'
import axios from 'axios'
// MUI Components
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { OauthUpdatePackageid } from '../actions/oauthAction'
// stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
// Util imports
import { makeStyles } from '@material-ui/core/styles'
// Custom Components
import CardInput from './CardInput'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
    boxShadow: '3px 3px 5px -3px rgba(0, 0, 0, 0.2)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
  rooot: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

function HomePage({ history, packageid }) {
  const classes = useStyles()
  // State
  const [email, setEmail] = useState('')
  const [resloading, setResloading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const res = await axios.post(
      'https://netbook-server.herokuapp.com/packages',
      {
        email: email,
      }
    )

    const clientSecret = res.data['client_secret']

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    })

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!')
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  const handleSubmitSub = async (event) => {
    let abc
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    })

    if (result.error) {
      console.log(result.error.message)
    } else {
      setResloading(true)
      const res = await axios.post(
        'https://netbook-server.herokuapp.com/packages/subscription',
        { payment_method: result.paymentMethod.id, email: email, packageid }
      )
      // eslint-disable-next-line camelcase
      const { client_secret, status } = res.data

      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
      }

      if (packageid === 'price_1IMpnpLSi7LM2Y4Gj69OcvqC') {
        abc = '602f98ff8be78a84324eeb1c'
      } else if (packageid === 'price_1IMazjLSi7LM2Y4Gg8zEo3FY') {
        abc = '602f98868be78a84324eeb1b'
      }
      if (res) {
        setResloading(false)
      }
      packageid = abc
      console.log('packageid', packageid)
      // const { data } = await axios.put(
      //   `http://localhost:5000/items/up/${oauth._id}`,
      //   { packageid },
      //   config
      // )

      dispatch(OauthUpdatePackageid(oauth._id, packageid))
      // console.log('updatedpackagedata', data)
      if (res) {
        history.push('/profile')
      }
      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log('There was an issue!')
            console.log(result.error)
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log('You got the money!')
            // Show a success message to your customer
          }
        })
      } else {
        console.log('You got the money!', res.data)

        // No additional information was needed
        // Show a success message to your customer
      }
    }
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <TextField
            label='Email'
            id='outlined-email-input'
            helperText={`Email you'll recive updates and receipts on`}
            margin='normal'
            variant='outlined'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <CardInput />
          <div className={classes.div}>
            {/* <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={handleSubmitPay}
          >
            Pay
          </Button> */}
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={handleSubmitSub}
            >
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
      {resloading ? (
        <div className={classes.rooot}>
          <CircularProgress />
        </div>
      ) : null}
    </>
  )
}

export default HomePage
