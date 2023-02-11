# stage 1 building
FROM node:18.14.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
# RUN npm run build

EXPOSE ${PORT}
CMD node dist/main

