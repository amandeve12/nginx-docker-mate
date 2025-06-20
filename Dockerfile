FROM node:18


WORKDIR /app

COPY server.js .
COPY index.html .
COPY package.json .

RUN npm install

EXPOSE 6000

CMD [ "node", "server.js" ]