import { API_BASE_URL } from './api-config'

interface RequestOptions {
  method?: string
  headers?: HeadersInit
  body?: string
}

export const request = async (endpoint: string, method: string = 'GET', body: any = null): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // Adicione outros cabeçalhos conforme necessário, como tokens de autenticação
  }

  const config: RequestOptions = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    console.log(response.statusText)

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API')
    }

    return await response.json()
  } catch (error) {
    console.error('Erro:', error)
    throw error
  }
}
