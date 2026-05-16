import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  CreateTaskBody,
  listTasksQuery,
  TasksParams,
  UpdateTaskBody,
  UpdateTaskStatusBody,
} from "./tasks.schema";
import { prisma } from "../lib/prisma";

export async function createTask(
  req: FastifyRequest<{ Body: CreateTaskBody }>,
  res: FastifyReply,
): Promise<void> {
  try {
    const { titulo, descricao, prazo, categoria } = req.body;
    const task = await prisma.task.create({
      data: {
        titulo,
        descricao: descricao || null,
        prazo: new Date(prazo),
        categoria,
      },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        status: true,
        categoria: true,
      },
    });
    res.status(201).send({ success: true, data: task });
  } catch (error) {
    req.log.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Erro interno ao enviar tarefa." });
  }
}

export async function listTasks(
  req: FastifyRequest<{ Querystring: listTasksQuery }>,
  res: FastifyReply,
): Promise<void> {
  try {
    const { categoria, status, search } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        ...(categoria !== undefined && { categoria }),
        ...(status !== undefined && { status }),
        ...(search && {
          OR: [
            { titulo: { contains: search, mode: "insensitive" } },
            { descricao: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: [{ status: "asc" }, { prazo: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        titulo: true,
        descricao: true,
        status: true,
        categoria: true,
        prazo: true,
        createdAt: true,
      },
    });
    return res
      .status(200)
      .send({ success: true, data: tasks, total: tasks.length });
  } catch (error) {
    req.log.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Erro interno ao usar tarefas" });
  }
}

export async function getTaskById(
  request: FastifyRequest<{ Params: TasksParams }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const { id } = request.params

    const task = await prisma.task.findUnique({
      where: { id },
      select: { id: true, title: true, description: true, status: true, priority: true, category: true, dueDate: true, createdAt: true },
    })

    if (!task) {
      return reply.status(404).send({ success: false, message: 'Tarefa não encontrada' })
    }

    return reply.status(200).send({ success: true, data: task })
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({ success: false, message: 'Erro interno ao buscar tarefa' })
  }
}

export async function updateTask(
  request: FastifyRequest<{ Params: TasksParams; Body: UpdateTaskBody }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const { id } = request.params
    const existing = await prisma.task.findUnique({ where: { id } })
    if (!existing) {
      return reply.status(404).send({ success: false, message: 'Tarefa não encontrada' })
    }
    const { titulo, descricao, prazo, categoria } = request.body
    const task = await prisma.task.update({
      where: { id },
      data: { titulo, descricao: descricao || null, prazo: new Date(prazo), categoria },
      select: { id: true, descricao: true, prazo: true, categoria: true, createdAt: true },
    })
    return reply.status(200).send({ success: true, data: task })
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({ success: false, message: 'Erro interno ao atualizar tarefa' })
  }
}

export async function updateTaskStatus(
  req: FastifyRequest<{ Params: TasksParams; Body: UpdateTaskStatusBody }>,
  res: FastifyReply,
): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existing = await prisma.task.findUnique({
      where: { id },
    });
    if (!existing) {
      return res
        .status(404)
        .send({ success: false, message: "Tarefa não encontrada." });
    }
    const task = await prisma.task.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        titulo: true,
        status: true,
        categoria: true,
        prazo: true,
      },
    });
    return res.status(200).send({ success: true, data: task });
  } catch (error) {
    req.log.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Erro interno ao atualizar tarefa" });
  }
}

export async function deleteTask(
  req: FastifyRequest<{ Params: TasksParams }>,
  res: FastifyReply,
): Promise<void> {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .send({ success: false, message: "Tarefa não encontrada" });
    }
    await prisma.task.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    req.log.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Não foi possível excluir task." });
  }
}
