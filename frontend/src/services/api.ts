import axios, { AxiosResponse } from "axios";
import { Task } from "../@types";

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Partial<Omit<Task, "id">>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api", 
  timeout: 5000,
});


export const createTask = (taskData: CreateTaskInput): Promise<AxiosResponse<ApiResponse<Task>>> => {
  return api.post<ApiResponse<Task>>("/tasks", taskData);
};


export const listTasks = (): Promise<AxiosResponse<ApiResponse<Task[]>>> => {
  return api.get<ApiResponse<Task[]>>("/tasks");
};


export const getTaskById = (id: string): Promise<AxiosResponse<ApiResponse<Task>>> => {
  return api.get<ApiResponse<Task>>(`/tasks/${id}`);
};


export const updateTask = (id: string, taskData: UpdateTaskInput): Promise<AxiosResponse<ApiResponse<Task>>> => {
  return api.put<ApiResponse<Task>>(`/tasks/${id}`, taskData);
};


export const updateTaskStatus = (id: string, status: Task["status"]): Promise<AxiosResponse<ApiResponse<Task>>> => {
  return api.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status });
};


export const deleteTask = (id: string): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/tasks/${id}`);
};