import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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

      const data = fetchedData.results

      this.setState({originalsMovies: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSlider = () => {
    const {originalsMovies} = this.state

    return (
      <Slider {...settings} className="slick-container">
        {originalsMovies.map(eachMovie => (
          <div className="slick-item" key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`}>
              <img
                className="originals-logo-image"
                src={eachMovie.poster_path}
                alt={eachMovie.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  renderLoadingView = () => (
    <div className="original-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickOriginalVideosRetry = () => {
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
        onClick={this.onClickOriginalVideosRetry}
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
    return <div className="slick-originals-container">{this.renderViews()}</div>
  }
}

export default ReactOriginalsSlick
