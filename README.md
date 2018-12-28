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

Create migration:
```
$ ts-node ./node_modules/typeorm/cli.js migration:generate -n CreateOperatorsTable

```

Run migration:
```
$ ts-node ./node_modules/typeorm/cli.js migration:run

```

## License

  [MIT licensed](LICENSE).
