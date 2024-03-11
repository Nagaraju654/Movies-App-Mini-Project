import './index.css'

const SimilarMovies = props => {
  const {eachMovie} = props

  const {title, posterPath} = eachMovie
  return (
    <li>
      <img src={posterPath} alt={title} className="similar-movie-image" />
    </li>
  )
}

export default SimilarMovies
