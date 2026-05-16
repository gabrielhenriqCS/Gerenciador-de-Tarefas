import { z } from "zod";

export const categoriaEnum = z.enum(["TRABALHO", "PESSOAL", "ESTUDOS"], {
  error: "Categoria inválida. Use: 'TRABALHO', 'PESSOAL' ou 'ESTUDOS'",
});

export const tasksStatusEnum = z.enum(["NOVA", "PENDENTE", "CONCLUIDA"]);

export const createTaskBodySchema = z.object({
    titulo: z.string({ error: 'O título é obrigatório' })
        .min(3, 'O título deve ter pelo menos 3 caracteres')
        .max(120, 'O título deve ter no máximo 120 caracteres')
        .trim(),
    descricao: z.string().max(500).trim().optional(),
    prazo: z
        .string({ error: 'O prazo é obrigatório' }),
    categoria: categoriaEnum,
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>

export const updateTaskStatusBodySchema = z.object({
    status: tasksStatusEnum,
})

export type UpdateTaskStatusBody = z.infer<typeof updateTaskStatusBodySchema>

export const updateTaskBodySchema = z.object({
    titulo: z.string(),
    descricao: z.string().optional(),
    prazo: z.date(),
    categoria: categoriaEnum
})

export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>

export const listTasksQuerySchema = z.object({
    categoria: categoriaEnum.optional(),
    status: tasksStatusEnum.optional(),
    search: z.string().optional(),
})

export type listTasksQuery = z.infer<typeof listTasksQuerySchema>

export const taskParamsSchema = z.object({
    id: z.uuid('ID da tarefa inválido'),
})

export type TasksParams = z.infer<typeof taskParamsSchema>