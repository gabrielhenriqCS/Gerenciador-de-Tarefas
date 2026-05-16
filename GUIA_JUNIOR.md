# 🎓 Guia do Desenvolvedor Junior - To-Do List Fullstack

Bem-vindo ao seu primeiro projeto fullstack! Este guia vai ajudá-lo a entender a arquitetura e como o projeto funciona.

## 📚 Estrutura Backend

### `server.ts` - O Coração da Aplicação
O servidor Fastify que recebe e responde requisições HTTP.

```typescript
// Registra CORS para o frontend acessar
app.register(cors, {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})

// Registra as rotas de tarefas com prefixo '/tasks'
app.register(tasksRoutes, { prefix: '/tasks' })
```

### `tasks.schema.ts` - Validação de Dados
Usa **Zod** para garantir que os dados chegam corretos:

```typescript
const createTaskBodySchema = z.object({
    titulo: z.string().min(3).max(120),
    descricao: z.string().max(500).optional(),
    prazo: z.string(),
    categoria: z.enum(["TRABALHO", "PESSOAL", "ESTUDOS"]),
})
```

### `tasks.controller.ts` - Lógica da Aplicação
Funções que processam as requisições e interagem com o banco:

```typescript
export async function createTask(req, res) {
  const { titulo, descricao, prazo, categoria } = req.body
  const task = await prisma.task.create({
    data: { titulo, descricao, prazo, categoria }
  })
  res.send({ success: true, data: task })
}
```

### `tasks.routes.ts` - Definição de Rotas
Mapeia as URLs e valida os dados antes de chegar ao controller:

```typescript
app.post("/", {
  preHandler: async (request, reply) => {
    // Valida o corpo da requisição
    const result = createTaskBodySchema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send(...)
    }
  }
}, createTask)
```

## 📚 Estrutura Frontend

### `Home.tsx` - Página Principal
Orquestra toda a aplicação, gerenciando estado global:

```typescript
// Estado das tarefas
const [tasks, setTasks] = useState<Task[]>([])

// Carrega tarefas quando componente monta
useEffect(() => { loadTasks() }, [])

// Funções que chamam a API
async function handleCreateTask(formData) {
  await tasksApi.create(formData)
  await loadTasks() // Recarrega lista
}
```

### `TaskForm.tsx` - Formulário
Componente controlado que valida dados no cliente:

```typescript
const [titulo, setTitulo] = useState("")

function handleSubmit(e) {
  e.preventDefault()
  if (!titulo.trim()) {
    alert("Preencha todos os campos")
    return
  }
  onSubmit({ titulo, descricao, prazo, categoria })
}
```

### `TaskList.tsx` - Lista de Tarefas
Renderiza cada tarefa com botões de ação:

```typescript
{tasks.map((task) => (
  <div key={task.id}>
    <button onClick={() => onToggleStatus(task.id, task.status)}>
      Marcar como {task.status === 'CONCLUIDA' ? 'pendente' : 'concluído'}
    </button>
    <button onClick={() => onEdit(task)}>Editar</button>
    <button onClick={() => onDelete(task.id)}>Deletar</button>
  </div>
))}
```

### `api.ts` - Comunicação com Backend
Centraliza todas as requisições HTTP:

```typescript
export const tasksApi = {
  create: (data) => request('/tasks', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateStatus: (id, status) => request(`/tasks/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
}
```

## 🔄 Fluxo de Dados

### Criar uma Tarefa
```
1. Usuário preenche o formulário
2. TaskForm.tsx valida e chama onSubmit()
3. Home.tsx chama tasksApi.create()
4. api.ts envia POST para http://localhost:3333/tasks
5. Backend valida com Zod
6. tasks.controller.ts salva no Prisma
7. Resposta volta para frontend
8. loadTasks() recarrega a lista
```

### Marcar como Concluído
```
1. Clique no checkbox
2. onToggleStatus(id, status) é chamado
3. tasksApi.updateStatus() envia PATCH
4. Backend atualiza apenas o status
5. Lista é recarregada
```

## 🛠️ Estrutura de Resposta da API

Todas as respostas seguem este padrão:

```typescript
{
  success: boolean,
  data: T,          // Tipo genérico (Task ou Task[])
  message?: string  // Apenas em erros
}
```

Exemplo de sucesso:
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "titulo": "Estudar React",
    "descricao": "Aprender hooks e componentes",
    "status": "PENDENTE",
    "categoria": "ESTUDOS",
    "prazo": "2024-12-31T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🐛 Debugging

### Debug Backend
```bash
# Ver logs das requisições
npm run dev

# Usar debugger do Node
node --inspect server.ts
```

### Debug Frontend
```bash
# Abrir DevTools (F12)
# Network tab - ver requisições HTTP
# Console tab - ver erros de JavaScript
```

## 📋 Tipos TypeScript

Sempre defina os tipos corretamente:

```typescript
// ✅ Bom
interface Task {
  id: string
  titulo: string
  status: 'NOVA' | 'PENDENTE' | 'CONCLUIDA'
}

// ❌ Evitar
const task: any = await fetch(...)
```

## 🎯 Checklist de Aprendizado

- [ ] Entendi como o Fastify rota as requisições
- [ ] Sei como o Zod valida dados
- [ ] Entendi o fluxo de dados frontend → backend → database
- [ ] Posso adicionar um novo campo a uma tarefa
- [ ] Posso criar um novo endpoint
- [ ] Posso adicionar um novo componente React
- [ ] Entendo CORS e por que é necessário
- [ ] Posso debugar uma requisição HTTP

## 📞 Dúvidas Frequentes

**P: Por que as datas estão em formato ISO (2024-01-15T10:30:00Z)?**
R: É o padrão internacional. Sempre use ISO para armazenar e transferir datas.

**P: Por que validar no frontend E no backend?**
R: Frontend valida para feedback rápido. Backend valida por segurança.

**P: Como adicionar um novo status?**
R: Atualize o enum no schema, no Prisma e no frontend.

---

**Parabéns por chegar até aqui! 🚀 Você está no caminho para ser um fullstack dev!**
