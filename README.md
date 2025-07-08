
# Como rodar o projeto completo (Front + Back)

> ⚠️ **Atenção sobre a versão do Node.js:**  
> O projeto foi testado com **Node 20.x no Windows**, mas **recomendamos usar exatamente a versão 16.x no Ubuntu/Linux** para evitar erros de compatibilidade.
---

### 1. Rodar o Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm start
```

---

### 2. Configurar o Banco de Dados

Crie um arquivo `.env` na pasta `backend` com a variável `DATABASE_URL`, por exemplo:

```
DATABASE_URL=mysql://usuario:senha@localhost:3306/seubanco
```

---

### 3. Rodar o Backend (Node + Prisma)

```bash
cd backend
npm install
```

Caso ainda não tenha rodado o generate do Prisma:

```bash
npx prisma generate --schema=src/prisma/schema.prisma
```

Para iniciar o backend:

```bash
npm run dev
```

---

### 4. Criar as tabelas e popular dados fictícios

Após configurar corretamente o `.env`, execute:

```bash
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
npx prisma db seed --schema=src/prisma/schema.prisma
```

---

## ✅ Resumo para rodar tudo na sequência

```bash
# FRONTEND
cd frontend
npm install
npm start

# BACKEND
cd backend
npm install
# configurar .env com DATABASE_URL
npx prisma generate --schema=src/prisma/schema.prisma
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
npx prisma db seed --schema=src/prisma/schema.prisma
npm run dev
```

---
