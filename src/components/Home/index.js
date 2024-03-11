import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import HomeMovieItem from '../HomeMovieItem'
import './index.css'
import Footer from '../Footer'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const renderOriginalsConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const renderTrendingConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const renderTopRatedConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const isHome = true

class Home extends Component {
  state = {
    renderOriginalsStatus: renderOriginalsConstraints.initial,
    renderTrendingStatus: renderTrendingConstraints.initial,
    renderTopRatedStatus: renderTopRatedConstraints.initial,
    originalsMoviesList: [],
    trendingMoviesList: [],
    topRatedMoviesList: [],
    randomMovie: [],
  }

  componentDidMount() {
    this.getOriginalsMoviesData()
    this.getTrendingMoviesData()
    this.getTopRatedMoviesData()
  }

  getOriginalsMoviesData = async () => {
    this.setState({
      renderOriginalsStatus: renderOriginalsConstraints.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedOriginalsData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      const randomNumber = Math.floor(
        Math.random() * fetchedOriginalsData.length,
      )

      const randomMovie = fetchedOriginalsData[randomNumber]

      this.setState({
        originalsMoviesList: fetchedOriginalsData,
        renderOriginalsStatus: renderOriginalsConstraints.success,
        randomMovie,
      })
    } else {
      this.setState({renderOriginalsStatus: renderOriginalsConstraints.failure})
    }
  }

  retryOriginalsMoviesData = () => {
    this.getOriginalsMoviesData()
  }

  getTrendingMoviesData = async () => {
    this.setState({renderTrendingStatus: renderTrendingConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedTrendingData = data.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))

      this.setState({
        trendingMoviesList: fetchedTrendingData,
        renderTrendingStatus: renderTrendingConstraints.success,
      })
    } else {
      this.setState({renderTrendingStatus: renderTrendingConstraints.failure})
    }
  }

  retryTrendingMoviesData = () => {
    this.getTrendingMoviesData()
  }

  getTopRatedMoviesData = async () => {
    this.setState({
      renderTopRatedStatus: renderTopRatedConstraints.inProgress,
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
        renderTopRatedStatus: renderTopRatedConstraints.success,
      })
    } else {
      this.setState({renderTopRatedStatus: renderTopRatedConstraints.failure})
    }
  }

  retryTopRatedMoviesData = () => {
    this.getTopRatedMoviesData()
  }

  renderPosterSuccessView = () => {
    const {randomMovie} = this.state

    const {backdropPath, title, overview} = randomMovie

    return (
      <div
        className="home-page"
        style={{
          backgroundImage: `url(${backdropPath})`,
        }}
      >
        <Header isHome={isHome} />
        <div className="home-movie-page">
          <h1 className="title">{title}</h1>
          <p className="overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderTopRatedSuccessView = () => {
    const {topRatedMoviesList} = this.state
    return (
      <>
        <div className="movies-list-page">
          <Slider {...settings} className="slick-container">
            {topRatedMoviesList.map(eachItem => (
              <HomeMovieItem eachMovie={eachItem} key={eachItem.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderTrendingSuccessView = () => {
    const {trendingMoviesList} = this.state

    return (
      <>
        <div className="movies-list-page">
          <Slider {...settings} className="slick-container">
            {trendingMoviesList.map(eachItem => (
              <HomeMovieItem eachMovie={eachItem} key={eachItem.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderOriginalsSuccessView = () => {
    const {originalsMoviesList} = this.state

    return (
      <>
        <div className="movies-list-page">
          <Slider {...settings} className="slick-container">
            {originalsMoviesList.map(eachItem => (
              <HomeMovieItem eachMovie={eachItem} key={eachItem.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderPosterErrorView = () => (
    <>
      <Header />
      <div className="error-page-container">
        <div className="error-page">
          <img
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
            alt="failure view"
            className="warning-icons"
          />
          <p className="poster-error-msg">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="poster-try-again-btn"
            onClick={this.retryOriginalsMoviesData}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderTopRatedErrorView = () => (
    <>
      <div className="error-page-container">
        <div className="thumbnail-error-page">
          <img
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
            alt="failure view"
            className="thumbnail-warning-icons"
          />
          <p className="thumbnail-error-msg">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="thumbnail-try-again-btn"
            onClick={this.retryTopRatedMoviesData}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderOriginalsErrorView = () => (
    <>
      <div className="error-page-container">
        <div className="thumbnail-error-page">
          <img
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
            alt="failure view"
            className="thumbnail-warning-icons"
          />
          <p className="thumbnail-error-msg">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="thumbnail-try-again-btn"
            onClick={this.retryOriginalsMoviesData}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderTrendingErrorView = () => (
    <>
      <div className="error-page-container">
        <div className="thumbnail-error-page">
          <img
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
            alt="failure view"
            className="thumbnail-warning-icons"
          />
          <p className="thumbnail-error-msg">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="thumbnail-try-again-btn"
            onClick={this.retryTrendingMoviesData}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderPosterLoadingView = () => (
    <>
      <Header />
      <div className="error-page-container">
        <div className="error-page">
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  renderThumbnailLoadingView = () => (
    <div className="error-page-container">
      <div className="thumbnail-error-page">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderPosterViews = () => {
    const {renderOriginalsStatus} = this.state
    switch (renderOriginalsStatus) {
      case renderOriginalsConstraints.success:
        return this.renderPosterSuccessView()
      case renderOriginalsConstraints.failure:
        return this.renderPosterErrorView()
      case renderOriginalsConstraints.inProgress:
        return this.renderPosterLoadingView()

      default:
        return null
    }
  }

  renderTopRatedViews = () => {
    const {renderTopRatedStatus} = this.state
    switch (renderTopRatedStatus) {
      case renderTopRatedConstraints.success:
        return this.renderTopRatedSuccessView()
      case renderTopRatedConstraints.failure:
        return this.renderTopRatedErrorView()
      case renderTopRatedConstraints.inProgress:
        return this.renderThumbnailLoadingView()

      default:
        return null
    }
  }

  renderTrendingViews = () => {
    const {renderTrendingStatus} = this.state
    switch (renderTrendingStatus) {
      case renderTrendingConstraints.success:
        return this.renderTrendingSuccessView()
      case renderTrendingConstraints.failure:
        return this.renderTrendingErrorView()
      case renderTrendingConstraints.inProgress:
        return this.renderThumbnailLoadingView()

      default:
        return null
    }
  }

  renderOriginalsViews = () => {
    const {renderOriginalsStatus} = this.state
    switch (renderOriginalsStatus) {
      case renderOriginalsConstraints.success:
        return this.renderOriginalsSuccessView()
      case renderOriginalsConstraints.failure:
        return this.renderOriginalsErrorView()
      case renderOriginalsConstraints.inProgress:
        return this.renderThumbnailLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderPosterViews()}
        <h1 className="movie-section-name">Top Rated</h1>
        {this.renderTopRatedViews()}
        <h1 className="movie-section-name">Trending Now</h1>
        {this.renderTrendingViews()}
        <h1 className="movie-section-name">Originals</h1>
        {this.renderOriginalsViews()}
        <Footer />
      </>
    )
  }
}

export default Home
