import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItems from '../MovieItems'
import FailureView from '../FailureView'
import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const searchRoute = true

class SearchPage extends Component {
  state = {
    renderStatus: renderConstraints.initial,
    searchResultsList: [],
    searchValue: '',
  }

  componentDidMount() {
    this.getSearchMoviesData()
  }

  getSearchMoviesData = async searchValue => {
    this.setState({
      renderStatus: renderConstraints.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedSearchMoviesData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        searchResultsList: fetchedSearchMoviesData,
        renderStatus: renderConstraints.success,
        searchValue,
      })
    } else {
      this.setState({renderStatus: renderConstraints.failure})
    }
  }

  tryAgainSearchData = () => {
    this.getSearchMoviesData()
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length > 0 ? (
      <ul className="search-items">
        {searchResultsList.map(eachMovie => (
          <MovieItems key={eachMovie.id} eachMovie={eachMovie} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state
    return (
      <div className="no-result-container">
        <img
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
          alt="no movies"
          className="no-results-image"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgainSearchData} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSwitchView = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.failure:
        return this.renderFailureView()
      case renderConstraints.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header
          searchRoute={searchRoute}
          getSearchMoviesData={this.getSearchMoviesData}
        />
        <div className="search-container">{this.renderSwitchView()}</div>
      </>
    )
  }
}

export default SearchPage
