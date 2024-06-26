import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route key={uuidV4()} {...props} />
}

export default ProtectedRoute
