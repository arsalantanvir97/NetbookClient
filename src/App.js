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
const App = () => {
  return (
    <Router>
      <PublicRoute path='/' component={Home} exact />
      <PrivateRoute path='/graph' component={Links} />
      <PrivateRoute path='/feed' component={FeedView} />
      <PrivateRoute path='/profile' component={Profile} />
      <PrivateRoute path='/query' component={Query} />
    </Router>
  )
}

export default App
