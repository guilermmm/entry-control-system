import api from '.'

export interface Sector {
  id: number
  name: string
  unitId: number
}

interface SearchParams {
  name?: string
  unitId?: number
}

export const getSectors = async (
  params: SearchParams = {},
): Promise<Sector[]> => {
  const response = await api.get('/sector', { params })
  return response.data
}

export const getSector = async (id: number): Promise<Sector> => {
  const response = await api.get(`/sector/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  unitId: number
}

export const createSector = async (params: CreateParams): Promise<Sector> => {
  const response = await api.post('/sector', params)
  return response.data
}

interface UpdateParams {
  name?: string
}

export const updateSector = async (
  id: number,
  params: UpdateParams,
): Promise<Sector> => {
  const response = await api.put(`/sector/${id}`, params)
  return response.data
}

export const deleteSector = async (id: number): Promise<void> => {
  await api.delete(`/sector/${id}`)
}
