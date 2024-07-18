import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="footer-social-contacts">
      <li className="icons">
        <FaGoogle />
      </li>

      <a
        target="__blank"
        href="https://x.com/vamshi_cric12"
        className="link-icon"
      >
        <li className="icons">
          <FaTwitter />
        </li>
      </a>

      <a
        target="__blank"
        href="https://www.instagram.com/vamshi_cric12/?hl=en"
        className="link-icon"
      >
        <li className="icons">
          <FaInstagram />
        </li>
      </a>

      <li className="icons">
        <FaYoutube />
      </li>
    </ul>
    <p className="footer-contact-us">Contact us</p>
  </div>
)

export default Footer
