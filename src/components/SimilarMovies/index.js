import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovies = props => {
  const {eachMovie, onClickSimilar} = props
  const {id} = eachMovie

  //   const onClickSimilarMovie = () => {
  //     onClickSimilar(id)
  //   }

  return (
    <Link to={`/movies/${id}`}>
      <li className="similar-list-item-container">
        <img
          src={eachMovie.poster_path}
          alt={eachMovie.title}
          className="similar-movie-image"
        />
      </li>
    </Link>
  )
}

export default SimilarMovies
