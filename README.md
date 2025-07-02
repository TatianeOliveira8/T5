# Como rodar o projeto completo (front + back)

### 1. Rodar o Frontend (React + TypeScript)
```bash
cd frontend
npm install
npm start
````

### 2. Rodar o Backend (Node + Prisma)

```bash
cd backend
npm install        
npm run dev        
```

### 3. Configurar banco de dados

* Crie um arquivo `.env` na pasta `backend` com a conexão do banco, por exemplo:

```
DATABASE_URL="mysql://usuario:senha@localhost:3306/seubanco"
```

### 4. Criar as tabelas e popular dados fictícios

```bash
npx prisma migrate dev --name init  
npx prisma db seed --schema=./src/prisma/schema.prisma
```


---

### Resumo para rodar tudo na sequência

```bash
cd frontend && npm install && npm start
cd backend && npm install && npm run dev
# configurar .env no backend com DATABASE_URL
npx prisma migrate dev --name init
npx prisma db seed --schema=./src/prisma/schema.prisma
```
