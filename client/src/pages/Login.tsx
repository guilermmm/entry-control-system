import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth_context'
import { login } from '../services/auth'

const Login = () => {
  const navigate = useNavigate()
  const { saveToken, token } = useAuth()

  const [register, setRegister] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      const user = await login({ register, password })

      if (user) {
        saveToken(user.token)
        navigate('/')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Login page</h1>
      <form>
        <label htmlFor="register">Register</label>
        <input
          type="text"
          id="register"
          value={register}
          onChange={e => setRegister(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login
