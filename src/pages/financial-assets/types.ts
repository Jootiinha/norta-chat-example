import { Project } from '../projects/types'

export type UserRole = 'admin' | 'user' | 'owner'

export type User = {
  id: number
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  projects: Project[]
  notes: string
  active: boolean
}

export type Property = {
  id: number
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
