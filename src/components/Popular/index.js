import {Component} from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusValue.initial,
    popularMovies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})

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
      const fetchedData = await response.json()

      const data = fetchedData.results.map(eachItem => ({
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
        uniqueId: uuidv4(),
      }))

      this.setState({popularMovies: data, apiStatus: apiStatusValue.success})
    }
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularView = () => {
    const {popularMovies} = this.state

    return (
      <ul className="popular-list-container">
        {popularMovies.map(eachItem => {
          const {id, posterPath, title, uniqueId} = eachItem

          return (
            <li className="popular-list-item">
              <Link to={`/movies/${id}`} key={uniqueId}>
                <img src={posterPath} alt={title} className="popular-image" />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => (
    <div className="popular-failure-container">
      <img
        src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719224516/Icon_j5mhse.png"
        alt="failure view"
        className="popular-failure-image"
      />
      <p className="popular-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-try-again"
        onClick={this.onClickRetry}
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
        return this.renderPopularView()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-main-container" data-testid="popularItem">
        <Header />
        {this.renderViews()}
        <Footer />
      </div>
    )
  }
}

export default Popular
