import { request } from '../request'

interface SignupData {
  email: string
  password: string
  repeatPassword: string
}

export const signup = (data: SignupData): Promise<any> => {
  return request('/users/create', 'POST', data)
}

interface LoginData {
  email: string
  password: string
}

export const login = (data: LoginData): Promise<any> => {
  return request('/auth/login', 'POST', data)
}
// Exporte outras funções de requisição conforme necessário
