import React from 'react'

const MoviesContext = React.createContext({
  searchInput: '',
  onChangeSearch: () => {},
  onClickSearch: () => {},
})

export default MoviesContext
