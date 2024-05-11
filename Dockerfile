FROM node:latest
WORKDIR /app
COPY . .

RUN yarn install
COPY package*.json ./

EXPOSE 3333

CMD ["yarn","sdev"]

