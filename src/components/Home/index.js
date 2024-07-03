import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Footer from '../Footer'
import Header from '../Header'
import ReactTrendingSlick from '../ReactTrendingSlick'
import ReactOriginalsSlick from '../ReactOriginalsSlick'
import TopRated from '../TopRated'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    originalMovies: [],
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
        posterPath: eachItem.poster_path,
      }))

      this.setState({originalMovies: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderHomeView = () => {
    const {originalMovies} = this.state

    const randomNumber = Math.ceil(Math.random() * (originalMovies.length - 1))

    const randomMovie = originalMovies[randomNumber]

    // const opacityValue = path === '/' || path.includes('/movies/') ? '0.5' : '1'

    const bgImage =
      window.innerWidth > 768
        ? randomMovie.backdropPath
        : randomMovie.posterPath

    const backgroundStyle = {
      backgroundImage: `url(${bgImage})`,
      width: '100%',
      backgroundSize: 'cover',
    }

    return (
      <>
        <div className="home-top-container" style={backgroundStyle}>
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
      </>
    )
  }

  renderLoadingHomeView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getTopRatedMovies()
  }

  renderFailureHomeView = () => (
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

  renderHomeViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoadingHomeView()
      case apiStatusValue.success:
        return this.renderHomeView()
      case apiStatusValue.failure:
        return this.renderFailureHomeView()

      default:
        return null
    }
  }

  render() {
    // const {topRatedMovies} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="home-container">
        {this.renderHomeViews()}
        <div className="body-container">
          <div className="slice-container">
            <div className="slick-main-container">
              <h1 className="slick-heading">Trending Now</h1>
              <ReactTrendingSlick />
            </div>
            <div className="top-rated-container">
              <h1 className="slick-heading">Top Rated</h1>
              <TopRated />
            </div>
            <div className="slick-main-container">
              <h1 className="slick-heading">Originals</h1>
              <ReactOriginalsSlick />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home

//  {topRatedMovies < 0 ? (
//           <div className="something-went-wrong">
//             <img
//               src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719226643/Background-Complete_rebzom.jpg"
//               alt="failure view"
//             />
//             <p className="failure-des">
//               Something went wrong. Please try againSomething went wrong. Please
//               try again
//             </p>
//             <button type="button" className="try-again">
//               Try Again
//             </button>
//           </div>
//         ) :
