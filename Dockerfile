# stage 1 building
FROM node:18.14.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
# RUN npm run build

# stage 2 building
# FROM node:18.14.0-alpine
# WORKDIR /usr/src/app
# COPY package*.json .
#
# RUN npm install --omit=dev
#
# COPY --from=builder /user/app/dist ./dist
# COPY .env .

EXPOSE ${PORT}
# CMD node dist/main

