import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const AccountPage = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <Header />
      <div className="account-page">
        <h1 className="account-heading">Account</h1>
        <hr className="separator" />
        <div className="member-ship-details">
          <p className="member-ship-text">Member ship</p>
          <div className="user-details">
            <p className="username">rahul@gmail.com</p>
            <p className="password">
              Password <span>: ************</span>
            </p>
          </div>
        </div>
        <hr className="separator" />
        <div className="plan-details">
          <p className="plan-details-text">Plan details</p>
          <p className="plan-name">Premium</p>
          <p className="plan-features">Ultra HD</p>
        </div>
        <hr className="separator" />
        <div className="button-container">
          <button
            type="button"
            onClick={onClickLogout}
            className="log-out-button"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AccountPage
