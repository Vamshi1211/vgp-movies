import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Header from '../Header'
import ReactTrendingSlick from '../ReactTrendingSlick'
import ReactOriginalsSlick from '../ReactOriginalsSlick'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    topRatedMovies: [],
    apiStatus: apiStatusValue.initial,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
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
      const fetchedData = await response.json()

      const data = fetchedData.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        title: eachItem.title,
        overview: eachItem.overview,
      }))

      this.setState({topRatedMovies: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderHomeView = () => {
    const {topRatedMovies, isClickedHamburger} = this.state
    const {match} = this.props
    const {path} = match

    const randomNumber = Math.ceil(Math.random() * (topRatedMovies.length - 1))

    const randomMovie = topRatedMovies[randomNumber]

    const opacityValue = path === '/' || path.includes('/movies/') ? '0.5' : '1'

    return (
      <>
        {topRatedMovies < 0 ? (
          <div className="something-went-wrong">
            <img
              src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719226643/Background-Complete_rebzom.jpg"
              alt="failure view"
            />
            <p className="failure-des">
              Something went wrong. Please try againSomething went wrong. Please
              try again
            </p>
            <button
              type="button"
              className="try-again"
              onClick={this.onClickRetry}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div
              className="home-top-container"
              style={{
                backgroundImage: `url(${randomMovie.backdropPath})`,
                width: '100%',
                backgroundSize: 'cover',
              }}
            >
              <Header />

              <div className="text-container">
                <h1 className="title-name">{randomMovie.title}</h1>
                <p className="title-description">{randomMovie.overview}</p>
                <button type="button" className="play-button">
                  Play
                </button>
              </div>
              <div className="bottom-linear-container">.</div>
            </div>
            <div className="body-container">
              <div className="slice-container">
                <ReactTrendingSlick />
                <ReactOriginalsSlick />
              </div>
            </div>
            <div className="footer-container">
              <div className="footer-social-contacts">
                <FaGoogle className="icons" />
                <FaTwitter className="icons" />
                <FaInstagram className="icons" />
                <FaYoutube className="icons" />
              </div>
              <p className="footer-contact-us">Contact Us</p>
            </div>
          </>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getTopRatedMovies()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719224516/Icon_j5mhse.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again" onClick={this.onClickRetry}>
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
        return this.renderHomeView()
      case apiStatusValue.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  //   renderLoadingViewForHome = () => (
  //     <div className="loader-containers" testid="loader">
  //       <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
  //     </div>
  //   )

  render() {
    const {topRatedMovies} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="home-container">
        {topRatedMovies.length <= 0 && <Header />}
        {this.renderViews()}
      </div>
    )
  }
}

export default Home
