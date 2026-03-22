FROM node:18
WORKDIR /mern-stack/client
COPY ./client/package*.json ./client/yarn.lock ./
RUN yarn install
CMD ["yarn", "start"]
