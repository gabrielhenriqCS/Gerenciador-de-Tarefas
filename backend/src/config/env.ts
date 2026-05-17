import { z } from 'zod'

const envSchema = z.object({
  
  DATABASE_URL: z.string({
    error: 'DATABASE_URL é obrigatória',
  }),
  
  
  DIRECT_URL: z.string({
    error: 'DIRECT_URL é obrigatória',
  }),

  PORT: z
    .string()
    .default('8080')
    .transform(Number)
    .pipe(z.number().int().min(1).max(65535)),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:')
  console.error(JSON.stringify(_env.error, null, 2))
  process.exit(1)
}

export const env = _env.data