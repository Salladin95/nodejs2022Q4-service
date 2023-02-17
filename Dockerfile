# stage 1 building
FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --omit-dev && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["npm", "run", "start:prisma"]
