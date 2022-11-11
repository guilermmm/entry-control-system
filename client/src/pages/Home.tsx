import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'

const Home = () => {
  const { token, user } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/visits">link</Link>
    </div>
  )
}

export default Home
