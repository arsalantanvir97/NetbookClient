import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/Home'
import Links from './screens/Links'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Router>
      <PrivateRoute path='/' component={Home} exact />
      <Route path='/graph' component={Links} />
    </Router>
  )
}

export default App
