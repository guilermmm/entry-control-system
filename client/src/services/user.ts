import api from '.'

export const PermitLevel = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  ATTENDANT: 'ATTENDANT',
}

export type PermitLevel = typeof PermitLevel[keyof typeof PermitLevel]

export interface User {
  id: number
  name: string
  register: string
  permitLevel: PermitLevel
  sectorId?: number
  unitId?: number
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  name?: string
  register?: string
  sectorId?: number
  unitId?: number
}

export const getUsers = async (params: SearchParams = {}): Promise<User[]> => {
  const response = await api.get('/user', { params })
  return response.data
}

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/user/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  register: string
  password: string
  sectorId?: number
  unitId?: number
  permitLevel: PermitLevel
}

export const createUser = async (params: CreateParams): Promise<User> => {
  const response = await api.post('/user', params)
  return response.data
}

interface UpdateParams {
  name?: string
  register?: string
  password?: string
  sectorId?: number
  unitId?: number
  permitLevel: PermitLevel
}

export const updateUser = async (
  id: number,
  params: UpdateParams,
): Promise<User> => {
  const response = await api.put(`/user/${id}`, params)
  return response.data
}
