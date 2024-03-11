import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItems from '../MovieItems'
import FailureView from '../FailureView'
import Footer from '../Footer'
import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const isPopular = true

class Popular extends Component {
  state = {
    renderStatus: renderConstraints.initial,
    popularMoviesList: [],
  }

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    this.setState({
      renderStatus: renderConstraints.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedPopularMoviesData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        popularMoviesList: fetchedPopularMoviesData,
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.failure})
    }
  }

  tryAgainPopularData = () => {
    this.getPopularMoviesData()
  }

  renderSuccessView = () => {
    const {popularMoviesList} = this.state
    return (
      <ul className="popular-items">
        {popularMoviesList.map(eachMovie => (
          <MovieItems key={eachMovie.id} eachMovie={eachMovie} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgainPopularData} />

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
        <Header isPopular={isPopular} />
        <div className="popular-container">{this.renderSwitchView()}</div>
        <Footer />
      </>
    )
  }
}

export default Popular
