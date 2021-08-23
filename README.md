# NextJS / Apollo demo

## Server

The server is an Express app exposing a GraphQL endpoint, built with [apollo-server-express](https://www.npmjs.com/package/apollo-server-express).

```
$ cd ./server
$ yarn install
$ yarn start
```

The GraphQL endpoint is [http://localhost:5000/graphql](http://localhost:5000/graphql) and you can access the playground at [http://localhost:5000/playground](http://localhost:5000/playground).

## Client

The client is a [NextJS](https://nextjs.org/) app, using [@apollo/client](https://www.apollographql.com/docs/react/), TypeScript, Sass. 

```
$ cd ./client
$ yarn install
$ yarn dev
```

The app will start on [http://localhost:3000/](http://localhost:3000/).

## Cypress

A few tests are implemented using [Cypress](https://www.cypress.io/). You can start it from the client directory using:

```
$ yarn cypress:open
```
