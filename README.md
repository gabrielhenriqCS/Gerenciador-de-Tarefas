# 📋 To-Do List - Aplicação Fullstack

Um gerenciador de tarefas moderno desenvolvido com **React + TypeScript** no frontend e **Fastify + Prisma** no backend.

## 🎯 Funcionalidades

- ✅ **Criar tarefas** - Adicione novas tarefas com título, descrição, data e categoria
- ✏️ **Editar tarefas** - Atualize os detalhes de uma tarefa existente
- 🗑️ **Deletar tarefas** - Remova tarefas que não são mais necessárias
- ☑️ **Marcar como concluído** - Alterne entre status de tarefa
- 🔍 **Filtrar tarefas** - Por categoria, status ou busca de texto
- 🎨 **Interface moderna** - Design responsivo com Tailwind CSS

## 📁 Estrutura do Projeto

```
To-Do/
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas (Home)
│   │   ├── services/      # Integração com API
│   │   ├── App.tsx        # Componente raiz
│   │   └── main.tsx       # Ponto de entrada
│   ├── package.json
│   └── vite.config.ts
│
└── backend/               # Servidor Fastify
    ├── src/
    │   ├── modules/       # Controladores e rotas
    │   ├── lib/           # Utilitários (Prisma, etc)
    │   ├── config/        # Configurações
    │   └── server.ts      # Servidor principal
    ├── package.json
    └── prisma/
        └── schema.prisma  # Schema do banco
```

## 🚀 Como Executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O backend estará disponível em `http://localhost:3333`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📝 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Lista todas as tarefas |
| GET | `/tasks/:id` | Obtém uma tarefa específica |
| POST | `/tasks` | Cria uma nova tarefa |
| PUT | `/tasks/:id` | Atualiza uma tarefa |
| PATCH | `/tasks/:id/status` | Atualiza o status de uma tarefa |
| DELETE | `/tasks/:id` | Deleta uma tarefa |

## 📦 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool

### Backend
- **Fastify** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas

## 🎓 Aprendizados como Junior Fullstack

Este projeto cobre:
- Comunicação frontend-backend com API REST
- Gerenciamento de estado React
- Componentes reutilizáveis
- Rotas HTTP com Fastify
- Validação com Zod
- Banco de dados com Prisma
- Tratamento de erros
- Responsividade com Tailwind CSS

## 💡 Próximos Passos para Melhorias

- [ ] Adicionar autenticação de usuário
- [ ] Implementar drag-and-drop para reordenar tarefas
- [ ] Adicionar temas (dark/light mode)
- [ ] Testes automatizados
- [ ] Deploy em produção
- [ ] Notificações de tarefas

---

**Desenvolvido como exercício de aprendizado fullstack junior** 🎉
