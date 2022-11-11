import { createContext, useContext, useEffect, useState } from 'react'
import {
  getSavedToken,
  getSavedUser,
  me,
  saveToken,
  saveUser,
} from '../services/auth'
import { PermitLevel } from '../services/user'

interface User {
  id: number
  name: string
  register: string
  permitLevel: PermitLevel
  sectorId?: number
  unitId?: number
}

interface AuthContext {
  user: User | null
  token: string | null
  saveUser: (user: User | null) => void
  saveToken: (token: string | null) => void
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  token: null,
  saveUser: () => {},
  saveToken: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(getSavedUser())
  const [token, setTokenState] = useState<string | null>(getSavedToken())

  const setUser = (user: User | null) => {
    saveUser(user)
    setUserState(user)
  }

  const setToken = (token: string | null) => {
    saveToken(token)
    setTokenState(token)
  }

  useEffect(() => {
    if (token) {
      me().then(user => {
        setUser(user)
      })
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{ user, token, saveUser: setUser, saveToken: setToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
