# Etapa 1: Usar a imagem oficial do Node.js
FROM node:18

# Instalar o netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Etapa 2: Definir o diretório de trabalho
WORKDIR /usr/src/app

# Etapa 3: Copiar o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install --force

# Etapa 5: Copiar o restante do código da aplicação
COPY . .

# Etapa 6: Rodar o Prisma Generate
RUN npx prisma generate

# Etapa 7: Expôr a porta que a API irá rodar
EXPOSE 3000

# Etapa 8: Definir o comando para rodar a API
CMD ["npm", "start"]
