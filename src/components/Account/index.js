import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="account-main-container">
      <Header />
      <div className="account-container">
        <h1 className="account-heading">Account</h1>
        <hr className="horizontal-line" />
        <div className="account-information-container">
          <p className="membership">Member ship </p>
          <div className="profile-info-container">
            <p className="g-mail">rahul@gmail.com</p>
            <p className="password-value">Password : ************</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="plan-details-container">
          <p className="plan-details">Plan details </p>
          <p className="premium">
            Premium <span className="video-resolution">Ultra HD</span>
          </p>
        </div>
        <hr className="horizontal-line" />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="account-footer-container">
        <div className="account-footer-social-contacts">
          <FaGoogle />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
        <p className="account-footer-contact-us">Contact Us</p>
      </div>
    </div>
  )
}

export default Account
