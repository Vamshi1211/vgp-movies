import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={Popular} />
        <ProtectedRoute exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Account} />
      </Switch>
    )
  }
}

export default App
