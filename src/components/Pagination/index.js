import {v4 as uuidv4} from 'uuid'
import './index.css'

const Pagination = props => {
  const {totalPosts, postsPerPage, setCurrentPage, currentPage} = props

  const pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          type="button"
          key={uuidv4()}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'active ' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
