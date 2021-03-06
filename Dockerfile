FROM node:15

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . ./

RUN yarn run build

EXPOSE 3000

CMD ["node", "./dist/src/app.js"];