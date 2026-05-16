import type { Task, ApiResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição");
  }

  return data;
}

export const tasksApi = {
  list: (filters?: {
    categoria?: string;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<Task[]>> => {
    const params = new URLSearchParams();
    if (filters?.categoria) params.append("categoria", filters.categoria);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString();
    return request<Task[]>(`/tasks${query ? `?${query}` : ""}`);
  },

  getById: (id: string): Promise<ApiResponse<Task>> =>
    request<Task>(`/tasks/${id}`),

  create: (data: {
    titulo: string;
    descricao?: string;
    prazo: string;
    categoria: string;
  }): Promise<ApiResponse<Task>> =>
    request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: {
      titulo: string;
      descricao?: string;
      prazo: string;
      categoria: string;
    }
  ): Promise<ApiResponse<Task>> =>
    request<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateStatus: (
    id: string,
    status: "NOVA" | "PENDENTE" | "CONCLUIDA"
  ): Promise<ApiResponse<Task>> =>
    request<Task>(`/tasks/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  delete: (id: string): Promise<void> =>
    request(`/tasks/${id}`, { method: "DELETE" }).then(() => undefined),
};
