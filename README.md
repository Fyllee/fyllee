<div align="center">

# Fyllee

<a href="./LICENSE" alt="License">
  <img src="https://img.shields.io/badge/License-Apache-green" />
</a>
<a href="https://github.com/fyllee/fyllee/commit/master" alt="Commits">
  <img src="https://img.shields.io/github/commit-activity/m/fyllee/fyllee" />
</a>
<a href="https://github.com/fyllee/fyllee/commit/master" alt="Last commit">
  <img src="https://img.shields.io/github/last-commit/fyllee/fyllee/master" />
</a>
<a href="https://github.com/fyllee/fyllee/graphs/contributors" alt="Contributors">
  <img src="https://img.shields.io/github/contributors/fyllee/fyllee" />
</a>
<a href="https://github.com/fyllee/fyllee/issues" alt="Issues">
  <img src="https://img.shields.io/github/issues-raw/fyllee/fyllee" />
</a>
<a href="https://github.com/fyllee/fyllee" alt="Github stars">
  <img src="https://img.shields.io/github/stars/fyllee/fyllee?style=social" />
</a>

</div>

The powerful official REST API of the Fyllee content-hosting platform!

Written in TypeScript with Nest.js, this REST API allows you to login to your account, create and manage your
applications, and create and manage your contents within your applications.

This GitHub repository is where we develop the Fyllee REST API! You can take a look at the web app repository at
[fyllee-ui](https://github.com/fyllee/fyllee-ui).

## Table of contents

- [Fyllee](#fyllee)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)

## Installation

To install Fyllee, clone the GitHub repository and install the Node.js modules. Then create a `.env` file.

```bash
$ git clone https://github.com/fyllee/fyllee.git fyllee
$ cd fyllee
$ npm install
$ cp .env.example .env
```

You can then fill in your personnal information in the `.env` file.

When this is done, launch Postgres with docker-compose. This will also launch pgadmin on `localhost:8080`.

```bash
$ docker-compose up
```

Finally, create the database and generate the schemas with MikroORM:

```bash
$ npx mikro-orm schema:create --run
```

## Usage

You can launch Fyllee either in development mode or in production mode. The API will be launched on `localhost:5000`,
unless you add `PORT=your port` in the your environment variables.\
You must use Node.js v12+ or v14+, but not v15 (or odd-numbered versions in general). The app has not been tested
Node.js v16+ yet.

**Development**

You can use the `start:dev` (or `dev`) script to launch the app. It will automatically recompile whenever you save a
file.
```bash
$ npm run start:dev # or npm run dev
```

**Production**

``` bash
$ npm run start
```

**Test**

```bash
$ npm run lint # Run linting tests (append ":fix" to automatically fix most of the errors)
$ npm run test # Run unit tests (append ":watch" to automatically restart them when a file is saved)
$ npm run test:e2e # Run end-to-end tests
$ npm run test:cov # Run coverage tests
$ npm run test:all # Run all tests, except coverage
```

## License

Copyright © 2021 Elliot Maisl & Mathis Le Bonniec. Licensed under the Apache-2.0 license, see [the license](./LICENSE).
