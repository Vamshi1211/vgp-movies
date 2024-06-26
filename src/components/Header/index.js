import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../context/MoviesContext'
import './index.css'

class Header extends Component {
  state = {isClickedHamburger: false}

  onClickHamburgerButton = () => {
    this.setState({isClickedHamburger: true})
  }

  onClickCrossButton = () => {
    this.setState({isClickedHamburger: false})
  }

  render() {
    const {isClickedHamburger} = this.state
    const {match} = this.props
    const {path} = match

    return (
      <MoviesContext.Consumer>
        {value => {
          const {searchInput, onChangeSearch, onClickSearch} = value

          const onChangeSearchInput = event => {
            onChangeSearch(event.target.value)
          }

          const onClickSearchButton = () => {
            onClickSearch()
          }

          const opacityValue =
            path === '/' || path.includes('/movies/') ? '0.5' : '1'

          /* const heightValue = isClickedHamburger ? '100px' : '75px' */

          return (
            <div className="main-bg-container" style={{opacity: opacityValue}}>
              <div className="header-top-container">
                <div className="mobile-image-container">
                  <img
                    src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719162886/Group_7399_1_kzymdq.png"
                    alt="website logo"
                    className="title-image"
                  />
                </div>
                <div className="title-and-nav-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719162886/Group_7399_1_kzymdq.png"
                      alt="website logo"
                      className="title-image"
                    />
                  </Link>
                  <div className="navbar-container">
                    <Link to="/" className="link-item">
                      <p className="nav-items">Home</p>
                    </Link>
                    <Link to="/popular" className="link-item">
                      <p className="nav-items">Popular</p>
                    </Link>
                  </div>
                </div>
                <div className="search-and-profile">
                  {path === '/search' ? (
                    <div className="search-container">
                      <input
                        className="search-input"
                        value={searchInput}
                        onChange={onChangeSearchInput}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="search-button-element"
                        onClick={onClickSearchButton}
                      >
                        <HiOutlineSearch className="search-icon" />
                      </button>
                    </div>
                  ) : (
                    <Link to="/search">
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="search-button"
                      >
                        <HiOutlineSearch className="search-icon" />
                      </button>
                    </Link>
                  )}
                  <Link to="/account" className="profile-image">
                    <img
                      src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719203200/Avatar_tkuwnc.png"
                      alt="profile"
                    />
                  </Link>
                  <button
                    type="button"
                    className="hamburger-button"
                    onClick={this.onClickHamburgerButton}
                  >
                    <img
                      src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719396604/add-to-queue_1_i42cra.png"
                      alt="hamburger"
                      className="hamburger-icon"
                    />
                  </button>
                </div>
              </div>
              {isClickedHamburger === true && (
                <div
                  className="popup-container"
                  style={{opacity: opacityValue}}
                >
                  <Link to="/" className="link-item">
                    <p className="hamburger-items">Home</p>
                  </Link>
                  <Link to="/popular" className="link-item">
                    <p className="hamburger-items">Popular</p>
                  </Link>
                  <Link to="/account" className="link-item">
                    <p className="hamburger-items">Account</p>
                  </Link>

                  <button
                    type="button"
                    className="cross-button"
                    onClick={this.onClickCrossButton}
                  >
                    <img
                      src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719399324/Shape_eunvfg.png"
                      alt="cross"
                      className="cross-icon"
                    />
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}
export default withRouter(Header)
