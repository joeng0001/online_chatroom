FROM node:20

WORKDIR /

copy . .

WORKDIR /server

RUN npm install

EXPOSE 8089

CMD ["node", "server.js"]
