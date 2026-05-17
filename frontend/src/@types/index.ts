
export type Categoria = 'TRABALHO' | 'PESSOAL' | 'ESTUDOS'
export type TaskStatus = 'PENDENTE' | 'CONCLUIDA' | 'NOVA'

export interface Task {
  id: string
  titulo: string
  descricao?: string
  status: TaskStatus
  categoria: Categoria
  prazo: string
  createdAt: string
}

export interface CreateTaskFormData {
  titulo: string
  descricao?: string
  prazo: string
  categoria: Categoria
}

