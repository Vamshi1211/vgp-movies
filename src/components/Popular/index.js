import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

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
      }))

      this.setState({popularMovies: data, apiStatus: apiStatusValue.success})
    }
  }

  renderLoadingView = () => (
    <div className="loader-containers" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularView = () => {
    const {popularMovies} = this.state

    return (
      <ul className="popular-list-container">
        {popularMovies.map(eachItem => {
          const {id, posterPath} = eachItem

          return (
            <li key={id} className="popular-list-item">
              <img src={posterPath} alt="popular" className="popular-image" />
            </li>
          )
        })}
      </ul>
    )
  }

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
      <div className="popular-main-container">
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}

export default Popular
