import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  //   const username = localStorage.getItem('username')
  //   const password = localStorage.getItem('password')

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
          <p className="membership">Member ship</p>
          <div className="profile-info-container">
            <p className="g-mail">rahul</p>
            <p className="password-value">Password: **********</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="plan-details-container">
          <p className="plan-details">Plan details</p>
          <p className="premium">Premium</p>
          <p className="video-resolution">Ultra HD</p>
        </div>
        <hr className="horizontal-line" />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="account-footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Account
