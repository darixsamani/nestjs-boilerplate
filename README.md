## Description

 A simple starter for building RESTful APIs with Nestjs, passport js, prisma, pactum and dotenv
## Installation

```bash
yarn install
```

## Running the app

```bash
yarn db:dev:restart
```

## Running with docker

Please make sure that you have specified your DATABASE_URL and JWT_SECRET correctly in the .env file.
```bash
docker run -p 3000:3000 --env-file .env -d darixsamani/nestjsboilerplate
```
 

## Running E2E Test

```bash
# e2e tests
$ yarn db:test:restart
$ yarn test:e2e


```

