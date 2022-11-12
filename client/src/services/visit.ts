import api from '.'

export interface Visit {
  id: number
  finalized: boolean
  visitorId: number
  unitId?: number
  sectorId?: number
  userId: number
}

interface SearchParams {
  visitorId?: number
  unitId?: number
  sectorId?: number
  userId?: number
}

export const getVisits = async (
  params: SearchParams = {},
): Promise<Visit[]> => {
  const response = await api.get('/visit', { params })
  return response.data
}

export const getVisit = async (id: number): Promise<Visit> => {
  const response = await api.get(`/visit/${id}`)
  return response.data
}

interface CreateParams {
  visitorId: number
  unitId?: number
  sectorId?: number
  userId: number
}

export const createVisit = async (params: CreateParams): Promise<Visit> => {
  const response = await api.post('/visit', params)
  return response.data
}

interface UpdateParams {
  visitorId?: number
  unitId?: number
  sectorId?: number
  userId?: number
}

export const updateVisit = async (
  id: number,
  params: UpdateParams,
): Promise<Visit> => {
  const response = await api.put(`/visit/${id}`, params)
  return response.data
}

export const finalizeVisit = async (id: number): Promise<Visit> => {
  const response = await api.patch(`/visit/${id}`)
  return response.data
}

export const deleteVisit = async (id: number): Promise<void> => {
  await api.delete(`/visit/${id}`)
}
