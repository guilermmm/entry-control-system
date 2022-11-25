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
        window.location.reload()
      }
    } catch (err) {
      alert('Usuário ou senha inválidos')
      console.error(err)
    }
  }

  return (
    <>
      <div className="h-screen-1/10 flex flex-col justify-center text-center items-center space-y-10 my-auto">
        <div className="bg-secondary-default rounded p-10 shadow shadow-black">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold border-b-4 border-primary-default w-fit">
              Login
            </h1>
          </div>
          <form className="flex flex-col w-64 text-2xl items-center">
            <input
              type="text"
              placeholder="Registro"
              className="my-4 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
              value={register}
              onChange={event => setRegister(event.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="mb-6 bg-transparent text-center border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button
              className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56 text-white"
              onClick={handleSubmit}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
