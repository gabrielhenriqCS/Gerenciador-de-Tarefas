# 🚀 Quick Start - Como Rodar o Projeto

## ✅ Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm
- Um banco de dados PostgreSQL (ou SQLite para desenvolvimento)

## 📋 Passo 1: Clonar/Preparar o Projeto

```bash
cd To-Do
ls  # Verifique se tem frontend e backend
```

## 🔧 Passo 2: Configurar o Backend

```bash
cd backend

# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
# Crie um arquivo .env com:
cat > .env << EOF
DATABASE_URL="postgresql://usuario:senha@localhost:5432/todo_db"
PORT=3333
NODE_ENV=development
EOF

# 3. Rodas migrações do Prisma
npx prisma migrate dev --name init

# 4. Iniciar o servidor
npm run dev
```

Você deve ver:
```
🚀 TaskFlow API rodando em http://localhost:3333
```

## 💻 Passo 3: Configurar o Frontend

Em **outra aba do terminal**:

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cat > .env << EOF
VITE_API_URL=http://localhost:3333
EOF

# 3. Iniciar o dev server
npm run dev
```

Você deve ver:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## 🎉 Pronto!

Abra seu navegador em **http://localhost:5173** e comece a usar! ✨

## 📝 Testando a Aplicação

1. **Criar Tarefa**: Clique em "➕ Criar Tarefa"
2. **Preencher Dados**: Título, Descrição (opcional), Data, Categoria
3. **Marcar Concluído**: Clique no ☑️ ao lado da tarefa
4. **Editar**: Clique no ✏️
5. **Deletar**: Clique no 🗑️

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Connection refused" (Backend)
- Verifique se PostgreSQL está rodando
- Verifique a DATABASE_URL no `.env`

### Erro: "Cannot reach backend" (Frontend)
- Verifique se backend está rodando em http://localhost:3333
- Cheque a VITE_API_URL no `.env`

### Porta já em uso
```bash
# Backend na porta 3333
lsof -i :3333
kill -9 <PID>

# Frontend na porta 5173
lsof -i :5173
kill -9 <PID>
```

## 📚 Próximos Passos

- Leia o `GUIA_JUNIOR.md` para entender a arquitetura
- Tente adicionar um novo campo (ex: prioridade)
- Explore o código fonte e adicione logs
- Estude os componentes React e controllers Fastify

Boa sorte! 🎓
