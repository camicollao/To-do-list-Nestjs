FROM node:21-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm","run", "start:dev" ]