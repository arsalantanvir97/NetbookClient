import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/Home'
import Links from './screens/Links'
import PublicRoute from './components/PublicRoute'
import FeedView from './screens/FeedView'
import Profile from './screens/Profile'
import PrivateRoute from './components/PrivateRoute'
import Import from './screens/Query'
import Query from './screens/Query'
import HomePage from './components/HomePage'
import Payment from './screens/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_IdCqGO7sona7aWZqqiXTs3MN00vl1vkEQa')

const App = () => {
  return (
    <Router>
      <PublicRoute path='/' component={Home} exact />
      <PrivateRoute path='/graph' component={Links} />
      <PrivateRoute path='/feed' component={FeedView} />
      <PrivateRoute path='/profile' component={Profile} />
      <PrivateRoute path='/query' component={Query} />
      <PrivateRoute path='/payment' component={Payment} />
      <Elements stripe={stripePromise}>
        <Route path='/homepage' component={HomePage} />
      </Elements>
    </Router>
  )
}

export default App
