FROM node:17.4.0

RUN git clone https://github.com/AssistGo/assist-go-server.git

WORKDIR /assist-go-server/

COPY package*.json ./

RUN npm install

RUN chmod +x docker_script.sh

RUN ./docker_script.sh

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]