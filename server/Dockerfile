FROM node:alpine

RUN mkdir -p /usr/src/server

ENV PORT 5000

WORKDIR /usr/src/server

COPY package.json /usr/src/server
COPY yarn.lock /usr/src/server

RUN yarn install

COPY . /usr/src/server

# RUN yarn run start

EXPOSE 5000

# CMD ["yarn", "start"]
# ENTRYPOINT ["yarn", "start"]
