import {Link} from 'react-router-dom'
import './index.css'

const HomeMovieItem = props => {
  const {eachMovie} = props

  const {id, title, posterPath} = eachMovie
  return (
    <Link to={`/movies/${id}`} className="link">
      <li className="list-item">
        <img src={posterPath} alt={title} className="image" />
      </li>
    </Link>
  )
}

export default HomeMovieItem
