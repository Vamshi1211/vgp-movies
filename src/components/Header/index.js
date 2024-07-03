import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../context/MoviesContext'
import './index.css'

class Header extends Component {
  state = {isClickedHamburger: false}

  onClickHamburgerButton = () => {
    this.setState(prevState => ({
      isClickedHamburger: !prevState.isClickedHamburger,
    }))
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

          return (
            <nav className="main-bg-container" style={{opacity: opacityValue}}>
              <div className="header-top-container">
                <div className="title-and-nav-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719162886/Group_7399_1_kzymdq.png"
                      alt="website logo"
                      className="title-image"
                    />
                  </Link>
                  <ul className="navbar-container">
                    <Link to="/" className="link-item">
                      <li className="nav-item">Home</li>
                    </Link>
                    <Link to="/popular" className="link-item">
                      <li className="nav-item">Popular</li>
                    </Link>
                  </ul>
                </div>
                <div className="search-and-profile">
                  {path === '/search' ? (
                    <div className="search-container">
                      <input
                        className="search-input"
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        placeholder="Search"
                        type="search"
                      />
                      <button
                        type="button"
                        testid="searchButton"
                        className="search-button-element"
                        onClick={onClickSearchButton}
                      >
                        <HiOutlineSearch className="search-icon" />
                      </button>
                    </div>
                  ) : (
                    <Link to="/search" className="search-icon-link">
                      <button
                        type="button"
                        className="search-button"
                        testid="searchButton"
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
                <ul className="popup-container">
                  <Link to="/" className="hamburger-link-item ">
                    <li className="nav-item">Home</li>
                  </Link>
                  <Link to="/popular" className="hamburger-link-item">
                    <li className="nav-item">Popular</li>
                  </Link>
                  <Link to="/account" className="hamburger-link-item">
                    <li className="nav-item">Account</li>
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
                </ul>
              )}
            </nav>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}
export default withRouter(Header)
