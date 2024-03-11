import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItems from '../MovieItems'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedMoviesPage extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    topRatedMoviesList: [],
  }

  componentDidMount() {
    this.getTopRatedMoviesData()
  }

  getTopRatedMoviesData = async () => {
    this.setState({
      apiStatus: apiStatusConstraints.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const topRatedMoviesApi = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedMoviesApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedTopRatedMoviesData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        topRatedMoviesList: fetchedTopRatedMoviesData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  tryAgainTopRatedMoviesData = () => {
    this.getTopRatedMoviesData()
  }

  renderSuccessView = () => {
    const {topRatedMoviesList} = this.state
    return (
      <ul className="search-items">
        {topRatedMoviesList.map(eachMovie => (
          <MovieItems key={eachMovie.id} eachMovie={eachMovie} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <FailureView tryAgain={this.tryAgainTopRatedMoviesData} />
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSwitchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="search-container">{this.renderSwitchView()}</div>
      </>
    )
  }
}

export default TopRatedMoviesPage
