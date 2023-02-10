# stage 1 building
FROM node:18.14.0-alpine as builder
WORKDIR /user/app
COPY package*.json .
RUN yarn install
COPY . .
RUN yarn run build

# stage 2 building
FROM node:18.14.0-alpine
WORKDIR /user/app
COPY package*.json .
RUN yarn install --production

COPY --from=builder /user/app/dist ./dist
COPY .env .

EXPOSE 3000
CMD node dist/main

