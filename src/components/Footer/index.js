import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="footer-social-contacts">
      <li className="icons">
        <FaGoogle />
      </li>

      <li className="icons">
        <FaTwitter />
      </li>

      <li className="icons">
        <FaInstagram />
      </li>

      <li className="icons">
        <FaYoutube />
      </li>
    </ul>
    <p className="footer-contact-us">Contact us</p>
  </div>
)

export default Footer
