import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/Home'
import Links from './screens/Links'
import PrivateRoute from './components/PrivateRoute'
import FeedView from './screens/FeedView'
import Profile from './screens/Profile'
const App = () => {
  return (
    <Router>
      <PrivateRoute path='/' component={Home} exact />
      <Route path='/graph' component={Links} />
      <Route path='/feed' component={FeedView} />
      <Route path='/profile' component={Profile} />
    </Router>
  )
}

export default App
