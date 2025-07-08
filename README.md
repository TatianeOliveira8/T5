
# Como rodar o projeto completo (Front + Back)

> ⚠️ **Atenção sobre a versão do Node.js:**  
> O projeto foi testado com **Node 22.x no Windows**, mas **recomendo usar exatamente a versão 16.x no Ubuntu/Linux** para evitar erros de compatibilidade.

> OBS: Se não funcionar, tente a versão 18.x. E, caso ainda não funcione, apague o package-lock.json, a pasta node_modules e rode npm install novamente.

---

Para garantir o ambiente correto, use o nvm (Node Version Manager):

**Como usar o nvm para trocar a versão do Node:**

**Instalar o nvm (se ainda não tiver):**
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```


Depois, feche e abra o terminal ou rode:

```bash
source ~/.bashrc
```

2. **Verificar se o nvm está instalado:**

```bash
nvm --version
```

3. **Instalar a versão desejada do Node (exemplo: 16):**

```bash
nvm install 16
```

4. **Usar a versão instalada:**

```bash
nvm use 16
```

5. **Definir a versão padrão para novos terminais:**

```bash
nvm alias default 16
```

6. **Verificar a versão ativa do Node:**

```bash
node -v
```

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
OBS: Verifique se a porta 3001 está livre. Se não estiver, finalize o processo com:

Linux:
```
lsof -i :3001        # Veja o PID na coluna "PID"
kill -9 PID          # Substitua PID pelo número que apareceu
```
Windows:
```
netstat -ano | findstr :3001   # Pegue o número do PID na última coluna
taskkill /PID PID /F           # Substitua PID pelo número que apareceu
```

---

### 4. Criar as tabelas e popular dados fictícios

Após configurar corretamente o `.env`, execute:

```bash
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
npx prisma db seed --schema=src/prisma/schema.prisma
```
OBS: Rode os comandos acima dentro da pasta backend

---

### Portas utilizadas:

- Frontend: http://localhost:3000  
- Backend: http://localhost:3001

### Tecnologias usadas:

- Frontend: React 19 + TypeScript, React Router DOM 7, Bootstrap 5, Create React App

- Backend: Node.js 16 (recomendado no Linux se outras versões derem problema), Express, Prisma, MySQL


