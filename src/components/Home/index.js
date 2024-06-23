import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    return (
      <div className="home-container">
        <div className="home-top-container">
          <Header />
        </div>
      </div>
    )
  }
}

export default Home
