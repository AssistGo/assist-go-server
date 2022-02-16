FROM node:17.4.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .
CMD [ "npm", "run", "start" ]