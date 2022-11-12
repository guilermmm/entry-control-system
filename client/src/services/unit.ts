import api from '.'

export interface Unit {
  id: number
  name: string
}

interface SearchParams {
  name?: string
}

export const getUnits = async (params: SearchParams = {}): Promise<Unit[]> => {
  const response = await api.get('/unit', { params })
  return response.data
}

export const getUnit = async (id: number): Promise<Unit> => {
  const response = await api.get(`/unit/${id}`)
  return response.data
}

interface CreateParams {
  name: string
}

export const createUnit = async (params: CreateParams): Promise<Unit> => {
  const response = await api.post('/unit', params)
  return response.data
}

interface UpdateParams {
  name?: string
}

export const updateUnit = async (
  id: number,
  params: UpdateParams,
): Promise<Unit> => {
  const response = await api.put(`/unit/${id}`, params)
  return response.data
}

export const deleteUnit = async (id: number): Promise<void> => {
  await api.delete(`/unit/${id}`)
}
