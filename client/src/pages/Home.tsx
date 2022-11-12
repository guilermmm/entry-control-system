import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'
import { getUser, User } from '../services/user'
import { getUrl } from '../util/functions'

const Home = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [userState, setUserState] = useState({} as User)

  useEffect(() => {
    if (user)
      getUser(user.id).then(user => {
        setUserState(user)
        navigate(getUrl(user.permitLevel))
      })
    console.log(userState)
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return <></>
}

export default Home
