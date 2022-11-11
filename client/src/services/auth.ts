import api from '.'
import { PermitLevel } from './user'

interface RegisterParams {
  name: string
  register: string
  password: string
  sectorId?: number
  unitId?: number
  permitLevel: PermitLevel
}

export const register = async (params: RegisterParams): Promise<void> => {
  await api.post('user_auth/register', params)
}

interface LoginParams {
  register: string
  password: string
}

interface LoginResponse {
  token: string
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post('user_auth/login', params)
  return response.data
}

interface UserJWT {
  id: number
  name: string
  register: string
  permitLevel: PermitLevel
  sectorId?: number
  unitId?: number
}

export const me = async (): Promise<UserJWT> => {
  const response = await api.post('user_auth/me')

  return response.data
}

export const getSavedUser = (): UserJWT | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const saveUser = (user: UserJWT | null): void => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
  }
}

export const getSavedToken = (): string | null => localStorage.getItem('token')

export const saveToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}
