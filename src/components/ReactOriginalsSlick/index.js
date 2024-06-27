import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
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
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactOriginalsSlick extends Component {
  state = {originalsMovies: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getOriginalVideos()
  }

  getOriginalVideos = async () => {
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
        posterPath: eachItem.poster_path,
      }))

      this.setState({originalsMovies: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSlider = () => {
    const {originalsMovies} = this.state

    return (
      <Slider {...settings}>
        {originalsMovies.map(eachLogo => {
          const {id, posterPath, title} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img
                  className="originals-logo-image"
                  src={posterPath}
                  alt={title}
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderLoadingView = () => (
    <div className="original-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getOriginalVideos()
  }

  renderFailureView = () => (
    <div className="original-failure-container">
      <img
        src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719224516/Icon_j5mhse.png"
        alt="failure view"
        className="original-failure-image"
      />
      <p className="original-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="original-try-again"
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
        return this.renderSlider()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="originals-main-container">
        <h1 className="originals-movies">Originals</h1>
        <div className="slick-originals-container">{this.renderViews()}</div>
      </div>
    )
  }
}

export default ReactOriginalsSlick
