import {HiOutlineSearch} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../context/MoviesContext'
import './index.css'

const Header = props => {
  const {match} = props
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

        const opacityValue = path === '/' ? '0.5' : '1'

        return (
          <div className="main-bg-container" style={{opacity: opacityValue}}>
            <div className="header-top-container">
              <div className="title-and-nav-container">
                <img
                  src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719162886/Group_7399_1_kzymdq.png"
                  alt="website logo"
                  className="title-image"
                />
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
                <Link to="/account">
                  <img
                    src="https://res.cloudinary.com/dxs4gnnbs/image/upload/v1719203200/Avatar_tkuwnc.png"
                    alt="profile"
                  />
                </Link>
              </div>
            </div>
          </div>
        )
      }}
    </MoviesContext.Consumer>
  )
}

export default withRouter(Header)
