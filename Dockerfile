FROM node:latest

WORKDIR /app

# Copie apenas os arquivos de dependências primeiro
COPY package.json ./

# Instale as dependências
RUN yarn install

# Então copie o restante dos arquivos
COPY . .

EXPOSE 3333

RUN yarn prisma:generate

CMD ["yarn","dev"]
