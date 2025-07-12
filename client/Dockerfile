FROM node:lts-buster
WORKDIR /mern-stack/client
COPY ./client/package*.json ./client/yarn.lock ./
RUN yarn install
CMD ["yarn", "start"]