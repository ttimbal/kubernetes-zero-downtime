FROM node:16-slim
LABEL authors="timbal"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3001
CMD [ "node", "index.js" ]
