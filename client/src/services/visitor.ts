import api from "."

export interface Visitor {
  id: number
  name: string
  cpf: string
  rg: string
  phone: string
  photo: string
}

interface SearchParams {
  cpf?: string
}

export const getVisitors = async (
  params: SearchParams = {},
): Promise<Visitor[]> => {
  const response = await api.get('/visitor', { params })
  return response.data
}

export const getVisitor = async (id: number): Promise<Visitor> => {
  const response = await api.get(`/visitor/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  cpf: string
  rg: string
  phone: string
  photo: string
}

export const createVisitor = async (params: CreateParams): Promise<Visitor> => {
  const response = await api.post('/visitor', params)
  return response.data
}

interface UpdateParams {
  name?: string
  cpf?: string
  rg?: string
  phone?: string
  photo?: string
}

export const updateVisitor = async (
  id: number,
  params: UpdateParams,
): Promise<Visitor> => {
  const response = await api.put(`/visitor/${id}`, params)
  return response.data
}

export const deleteVisitor = async (id: number): Promise<void> => {
  await api.delete(`/visitor/${id}`)
}





