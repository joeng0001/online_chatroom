FROM node:20

WORKDIR /

copy . .

WORKDIR /client

RUN npm install

RUN npm run build

WORKDIR /server

RUN npm install

EXPOSE 8089

CMD ["node","--max-old-space-size=4096", "server.js"]
