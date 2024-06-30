import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import format from 'date-fns/format'
import Header from '../Header'
import SimilarMovies from '../SimilarMovies'
import Footer from '../Footer'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class MovieItemDetails extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = {
        adult: fetchedData.movie_details.adult,
        backdropPath: fetchedData.movie_details.backdrop_path,
        budget: fetchedData.movie_details.budget,
        genres: fetchedData.movie_details.genres,
        id: fetchedData.movie_details.id,
        overview: fetchedData.movie_details.overview,
        posterPath: fetchedData.movie_details.poster_path,
        releaseDate: fetchedData.movie_details.release_date,
        runtime: fetchedData.movie_details.runtime,
        similarMovies: fetchedData.movie_details.similar_movies,
        spokenLanguages: fetchedData.movie_details.spoken_languages,
        title: fetchedData.movie_details.title,
        voteAverage: fetchedData.movie_details.vote_average,
        voteCount: fetchedData.movie_details.vote_count,
      }

      this.setState({movieDetails: data, apiStatus: apiStatusValue.success})
    }
  }

  renderMovieDetailsView = () => {
    const {movieDetails} = this.state
    const {
      adult,
      backdropPath,
      title,
      budget,
      genres,
      overview,
      releaseDate,
      spokenLanguages,
      runtime,
      voteAverage,
      voteCount,
      similarMovies,
    } = movieDetails

    const updatedGenres = genres.map(eachItem => ({
      uniqueId: eachItem.id,
      name: eachItem.name,
    }))

    const updatedLanguages = spokenLanguages.map(eachItem => ({
      uniqueIdV1: eachItem.id,
      englishName: eachItem.english_name,
    }))

    const hours = Math.floor(runtime / 60)
    const mins = Math.floor(runtime) % 60

    const year = format(new Date(releaseDate), 'yyyy')
    const month = format(new Date(releaseDate), 'MMMM')
    const date = format(new Date(releaseDate), 'dd')

    const duration = `${hours}h ${mins}m`

    return (
      <>
        <div
          className="movie-details-top-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            width: '100%',
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <div className="movie-details-text-container">
            <h1 className="movie-title">{title}</h1>
            <div className="duration-rated-release-date-container">
              <p className="run-time">{duration}</p>
              <p className="certificate">{adult === true ? 'A' : 'U/A'}</p>
              <p className="release-year">{year}</p>
            </div>
            <p className="overview_des">{overview}</p>
            <button type="button" className="movie-details-play-button">
              Play
            </button>
          </div>
          <div className="bottom-gradient">.</div>
        </div>

        <div className="details-container">
          <ul className="genre-container">
            <h1 className="genre-heading">Genres</h1>
            {updatedGenres.map(eachItem => {
              const {uniqueId, name} = eachItem
              return (
                <li className="each-genre-item" key={uniqueId}>
                  <p className="genre-names">{name}</p>
                </li>
              )
            })}
          </ul>

          <ul className="languages-container">
            <h1 className="languages-available">Audio Available</h1>
            {updatedLanguages.map(eachItem => {
              const {uniqueIdV1, englishName} = eachItem
              return (
                <li className="each-language-item" key={uniqueIdV1}>
                  <p className="languages">{englishName}</p>
                </li>
              )
            })}
          </ul>

          <div className="rating-count-average-container">
            <ul className="rating-list-container">
              <h1 className="rating-count-heading">Rating Count</h1>
              <li className="rating-item">
                <p className="rating-count">{voteCount}</p>
              </li>
            </ul>

            <ul className="rating-average-container">
              <h1 className="rating-average-heading">Rating Average</h1>
              <li className="rating-avg-item">
                <p className="rating-average">{voteAverage}</p>
              </li>
            </ul>
          </div>

          <div className="budget-release-date-container">
            <ul className="budget-list-container">
              <h1 className="budget-heading">Budget</h1>
              <li className="budget-item-container">
                <p className="budget-value">{budget}</p>
              </li>
            </ul>

            <ul className="release-list-container">
              <h1 className="release-date-heading">Release Date</h1>
              <li className="release-date-item-container">
                <p className="release-date-value">{`${date}th ${month} ${year}`}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="similar-videos-container">
          <h1 className="similar-videos-heading">More like this </h1>
          <ul className="similar-list-container">
            {similarMovies.map(eachMovie => (
              <SimilarMovies key={eachMovie.id} eachMovie={eachMovie} />
            ))}
          </ul>
        </div>

        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="movie-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="movie-details-failure-container">
      <img
        src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719224516/Icon_j5mhse.png"
        alt="failure view"
        className="movie-details-failure-image"
      />
      <p className="movie-details-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="movie-details-try-again"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoadingView()
      case apiStatusValue.success:
        return this.renderMovieDetailsView()
      case apiStatusValue.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {movieDetails} = this.state

    return (
      <div className="movie-details-main-container" testid="movieItem">
        {movieDetails.length <= 0 && <Header />}
        {this.renderViews()}
      </div>
    )
  }
}

export default MovieItemDetails

/* <div className="movie-details-footer-container">
          <div className="movie-details-footer-social-contacts">
            <FaGoogle className="movie-details-icons" />
            <FaTwitter className="movie-details-icons" />
            <FaInstagram className="movie-details-icons" />
            <FaYoutube className="movie-details-icons" />
          </div>
          <p className="movie-details-footer-contact-us">Contact Us</p>
        </div> */
