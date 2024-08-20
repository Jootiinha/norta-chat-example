import { request } from '../request'

const URL_BASE = '/properties'
interface PropertyData {
  title: string
  document_number_landlord: string
  rental_value: number
  sale_value: number
  address: string
  address_number: string
  cep_number: string
  city: string
  state: string
  description: string
  is_new: boolean
}

export const totalProperties = (): Promise<any> => {
  return request(`${URL_BASE}/resume?type=total_properties`, 'GET')
}

export const createProperty = (data: PropertyData): Promise<any> => {
  return request(`${URL_BASE}/create`, 'POST', data)
}
