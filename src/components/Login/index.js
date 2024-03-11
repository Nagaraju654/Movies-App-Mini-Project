import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureSubmit = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successSubmit(data.jwt_token)
    } else {
      this.failureSubmit(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="icons-container">
          <img
            src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
            alt="login website logo"
            className="website-logo"
          />
        </div>
        <div className="form-container">
          <form onSubmit={this.submitForm} className="login-form-container">
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
              {showError && <p className="error-massage">{errorMsg}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
