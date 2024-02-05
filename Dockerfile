FROM node

WORKDIR /

copy . .

WORKDIR /server

RUN npm install

EXPOSE 8089

CMD ["node", "server.js"]
