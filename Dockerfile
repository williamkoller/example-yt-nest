FROM node:18.5.0-alpine3.16

WORKDIR /app/

RUN mkdir -p /app/

COPY package.json /app/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]