import React from 'react'

const MoviesContext = React.createContext({
  searchInput: '',
  onChangeSearch: () => {},
  onClickSearch: () => {},
  onEnterKeyDown: () => {},
})

export default MoviesContext
