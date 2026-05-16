import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
  updateTaskStatus,
} from "./tasks.controller";
import {
  createTaskBodySchema,
  listTasksQuerySchema,
  taskParamsSchema,
  updateTaskStatusBodySchema,
} from "./tasks.schema";

export async function tasksRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  app.post(
    "/",
    {
      preHandler: async (request, reply) => {
        const result = createTaskBodySchema.safeParse(request.body);
        if (!result.success) {
          return reply.status(400).send({
            success: false,
            message: "Dados de entrada inválidos",
            errors: result.error,
          });
        }
        request.body = result.data;
      },
    },
    createTask,
  );

  app.get(
    "/",
    {
      preHandler: async (request, reply) => {
        const result = listTasksQuerySchema.safeParse(request.query);
        if (!result.success) {
          return reply.status(400).send({
            success: false,
            message: "Parâmetros de query inválidos",
            errors: result.error.flatten().fieldErrors,
          });
        }
        request.query = result.data;
      },
    },
    listTasks,
  );

  app.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const result = taskParamsSchema.safeParse(request.params);
        if (!result.success) {
          return reply
            .status(400)
            .send({ success: false, message: "ID de tarefa inválido" });
        }
        request.params = result.data;
      },
    },
    getTaskById,
  );

  app.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const paramsResult = taskParamsSchema.safeParse(request.params);
        if (!paramsResult.success) {
          return reply
            .status(400)
            .send({ success: false, message: "ID de tarefa inválido" });
        }
        const bodyResult = createTaskBodySchema.safeParse(request.body);
        if (!bodyResult.success) {
          return reply.status(400).send({
            success: false,
            message: "Dados inválidos",
            errors: bodyResult.error,
          });
        }
        request.params = paramsResult.data;
        request.body = {
          ...bodyResult.data,
          prazo: new Date(bodyResult.data.prazo),
        };
      },
    },
    updateTask,
  );

  app.patch(
    "/:id/status",
    {
      preHandler: async (request, reply) => {
        const paramsResult = taskParamsSchema.safeParse(request.params);
        if (!paramsResult.success) {
          return reply
            .status(400)
            .send({ success: false, message: "ID de tarefa inválido" });
        }
        const bodyResult = updateTaskStatusBodySchema.safeParse(request.body);
        if (!bodyResult.success) {
          return reply.status(400).send({
            success: false,
            message: "Status inválido",
            errors: bodyResult.error,
          });
        }
        request.params = paramsResult.data;
        request.body = bodyResult.data;
      },
    },
    updateTaskStatus,
  );

  app.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        const result = taskParamsSchema.safeParse(request.params);
        if (!result.success) {
          return reply
            .status(400)
            .send({ success: false, message: "ID de tarefa inválido" });
        }
        request.params = result.data;
      },
    },
    deleteTask,
  );
}

