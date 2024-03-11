import {Link} from 'react-router-dom'
import './index.css'

const MovieItems = props => {
  const {eachMovie} = props
  const {id, posterPath, title} = eachMovie
  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img src={posterPath} alt={title} className="popular-image" />
      </li>
    </Link>
  )
}

export default MovieItems
