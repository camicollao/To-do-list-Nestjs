FROM --platform=linux/amd64 node:21-alpine AS builder
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

FROM --platform=linux/amd64 node:21-alpine AS development
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
CMD [ "npm", "run", "start:dev" ]

FROM --platform=linux/amd64 node:21-alpine AS production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN  npm ci --ommit=dev
COPY --from=builder /usr/src/app/dist ./dist
CMD [ "node","dist/main" ]