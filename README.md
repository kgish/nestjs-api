# Nestjs API

## Description

Example REST-API server based on [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

Create a new empty migration:
```
$ ts-node ./node_modules/typeorm/cli.js migration:create -n NameOfMigration

```

Generate a migration from current schemas:
```
$ ts-node ./node_modules/typeorm/cli.js migration:generate -n NameOfMigration

```

Run all the migrations:
```
$ yarn migration:run

```

## References

* [NestJS](https://nestjs.com)
* [Developing Backend APIs with Nest.js](https://auth0.com/blog/full-stack-typescript-apps-part-1-developing-backend-apis-with-nestjs)
* [JWT](https://github.com/nestjs/jwt)
* [Typeorm](https://github.com/typeorm/typeorm)
* [Migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
* [PassportJS](http://www.passportjs.org)
* [Faker](https://github.com/marak/Faker.js)
* []
