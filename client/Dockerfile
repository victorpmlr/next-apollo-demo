FROM node:alpine
RUN mkdir -p /usr/src/app

ENV PORT 3000
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT http://localhost:5000/graphql

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

# RUN yarn run build
# RUN yarn run start

EXPOSE 3000

# ENTRYPOINT ["yarn", "prod"]
