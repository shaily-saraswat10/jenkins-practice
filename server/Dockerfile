FROM node:lts-buster
WORKDIR /mern-stack/server
COPY ./server/package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
