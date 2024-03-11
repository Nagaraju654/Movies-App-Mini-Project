import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <div className="footer-icons-container">
      <FaGoogle className="contact-icon" />
      <FaTwitter className="contact-icon" />
      <FaInstagram className="contact-icon" />
      <FaYoutube className="contact-icon" />
    </div>
    <p className="contact-text">Contact Us</p>
  </div>
)

export default Footer
