import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'

const Visits = () => {
  const { token } = useAuth()

  if (!token) {
    console.log('No token')
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Visit Page</h1>
    </div>
  )
}

export default Visits
