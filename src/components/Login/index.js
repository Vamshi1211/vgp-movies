import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isSubmitFailure: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  oSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isSubmitFailure: true})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userData = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.oSubmitSuccess(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg, isSubmitFailure} = this.state

    return (
      <div className="background-image">
        <div className="heading-container">
          <img
            src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719130432/Group_7399_k2bkjt.png"
            alt="login website logo"
            className="login-website-logo"
            loading="lazy"
          />
        </div>
        <div className="form-bg-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label-text">
                USERNAME
              </label>
              <input
                id="username"
                className="input-field"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="password-container">
              <label htmlFor="passwordId" className="label-text">
                PASSWORD
              </label>
              <input
                id="passwordId"
                className="password-field"
                placeholder="Password"
                type="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>

            {isSubmitFailure && <p className="err-msg">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>

            <button type="submit" className="sign-button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
