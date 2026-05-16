import Fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './config/env'
import { tasksRoutes } from './modules/tasks.routes'

const app = Fastify({ logger: true })

await app.register(cors, {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})

app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}))

await app.register(tasksRoutes, { prefix: '/tasks' })

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
  console.log(`🚀 TaskFlow API rodando em http://localhost:${env.PORT}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}