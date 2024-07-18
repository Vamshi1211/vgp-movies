import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {BsArrowLeftSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Pagination from '../Pagination'

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
    currentPage: 1,
    postsPerPage: 8,
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

      const data = fetchedData.results

      this.setState({popularMovies: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  setCurrentPost = page => {
    this.setState({currentPage: page})
  }

  renderPopularView = () => {
    const {popularMovies, currentPage, postsPerPage} = this.state

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage

    const currentPost = popularMovies.slice(firstPostIndex, lastPostIndex)

    return (
      <>
        <ul className="popular-list-container">
          {currentPost.map(eachMovie => (
            <li className="popular-list-item" key={eachMovie.id}>
              <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                <img
                  src={eachMovie.poster_path}
                  alt={eachMovie.title}
                  className="popular-image"
                  loading="lazy"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Pagination
          totalPosts={popularMovies.length}
          postsPerPage={postsPerPage}
          setCurrentPage={this.setCurrentPost}
          currentPage={currentPage}
        />
      </>
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
        loading="lazy"
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
      <div className="popular-main-container">
        <Header />
        {this.renderViews()}

        <Footer />
      </div>
    )
  }
}

export default Popular
