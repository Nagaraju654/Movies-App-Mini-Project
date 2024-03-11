import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {fullMenu: false, searchValue: ''}

  menuShow = () => {
    this.setState({fullMenu: true})
  }

  menuHide = () => {
    this.setState({fullMenu: false})
  }

  getSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => {
    const {getSearchMoviesData} = this.props
    const {searchValue} = this.state
    if (searchValue !== '') {
      getSearchMoviesData(searchValue)
    }
  }

  render() {
    const {fullMenu, searchValue} = this.state
    const {searchRoute, isHome, isPopular} = this.props
    const searchContainer = searchRoute
      ? 'search-input-container search-input-route-container'
      : 'search-input-container'
    const searchButton = searchRoute
      ? 'search-route-button search-button'
      : 'search-button'
    const searchIcon = searchRoute ? 'searchIcon icons' : 'icons'
    const homeRoute = isHome ? 'menu-items highlight' : 'menu-items'
    const popularRoute = isPopular ? 'menu-items highlight' : 'menu-items'
    return (
      <nav className="nav-bar-container">
        <div className="header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650191862/Mini%20Project%20Netflix%20Clone/MoviesIcon_snclt2.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="show-menu show1">
            <Link to="/" className={homeRoute}>
              <li>Home</li>
            </Link>
            <Link to="/popular" className={popularRoute}>
              <li>Popular</li>
            </Link>
          </ul>
          <div className="icons-container">
            <div className={searchContainer}>
              {searchRoute && (
                <input
                  type="search"
                  className="search-input"
                  value={searchValue}
                  onChange={this.getSearchInput}
                />
              )}
              <Link to="/search">
                <button
                  testid="searchButton"
                  type="button"
                  className={searchButton}
                  alt="searchButton"
                  onClick={this.onClickSearch}
                >
                  <HiOutlineSearch className={searchIcon} />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dhwgs3yjn/image/upload/v1687850395/Avatarprofile_astz8n.png"
                alt="profile"
                className="profile-image show1"
              />
            </Link>
            <button
              type="button"
              className="show close-btn"
              onClick={this.menuShow}
            >
              <MdMenuOpen className="hamburger icons" />
            </button>
          </div>
        </div>

        <nav className="show">
          {fullMenu && (
            <ul className="show-menu">
              <Link to="/" className={homeRoute}>
                <li>Home</li>
              </Link>
              <Link to="/popular" className={popularRoute}>
                <li>Popular</li>
              </Link>
              <Link to="/account" className="link">
                <li>Account</li>
              </Link>
              <li>
                <button
                  type="button"
                  onClick={this.menuHide}
                  className="close-btn"
                >
                  <AiFillCloseCircle className="close icons" />
                </button>
              </li>
            </ul>
          )}
        </nav>
      </nav>
    )
  }
}

export default Header
