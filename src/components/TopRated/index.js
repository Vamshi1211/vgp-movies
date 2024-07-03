import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

class TopRated extends Component {
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
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'

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

      this.setState({apiStatus: apiStatusValue.success, topRatedMovies: data})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoadingTopRatedView = () => (
    <div className="trending-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureTopRatedView = () => (
    <div className="trending-failure-container">
      <img
        src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719224516/Icon_j5mhse.png"
        alt="failure view"
        className="trending-failure-image"
      />
      <p className="trending-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="trending-try-again"
        onClick={this.onClickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderTopRatedView = () => {
    const {topRatedMovies} = this.state

    return (
      <Slider {...settings} className="slider-container">
        {topRatedMovies.map(eachMovie => (
          <div className="slick-item" key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`}>
              <img
                className="trending-logo-image"
                src={eachMovie.poster_path}
                alt={eachMovie.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoadingTopRatedView()
      case apiStatusValue.success:
        return this.renderTopRatedView()
      case apiStatusValue.failure:
        return this.renderFailureTopRatedView()

      default:
        return null
    }
  }

  render() {
    return <div className="top-rated-container">{this.renderViews()}</div>
  }
}

export default TopRated
