# productO API

<p align="center">
    productO is a product details management API, writing by <a href="https://www.typescriptlang.org" target="blank">Typescript</a> language and <a href="http://nestjs.com/" target="blank">Nest.js</a> framework.</p>
<p align="center">

## Demo

    https://producto-api.azurewebsites.net/api

## Features

    In memory db   :  @nestjs-addons/in-memory-db
    Server less    :  Deployable to Azure Functions
    Swagger        :  Intergrated
    Authentication :  JWT Token Base Authentication

## Installation

```bash
$ npm install
```

## Setup Azure Functions development

Install the Azure Functions <a href="https://docs.microsoft.com/azure/azure-functions/functions-run-local#v2" rel=" noopener" target="_blank">Core Tools</a>

```bash
# MAC OS
brew tap azure/functions
brew install azure-functions-core-tools@4

# Windows
Please refer the link
```

Install the Azure <a href="https://docs.microsoft.com/en-gb/cli/azure/install-azure-cli-macos" rel=" noopener" target="_blank">CLI</a>

```bash
# MAC OS
brew update && brew install azure-cli

# Windows
Please refer the link
```

## Running the app

```bash

#Local Azure Functions environment
$ npm run start:azure

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

### Swagger

    http://localhost:8081/docs/

## Seed in-memory-db DB

    Products :  http://localhost:8081/seed/products
    --
    Users    : http://localhost:8081/seed/users

## Deploying to Azure Functions

Install Visual Studio Code Extention <a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions" rel=" noopener" target="_blank">Azure Functions</a>

    Login to the Azure account
    Hit the "Deploy to Function App" Arrow icon

## Stay in touch

- Author - [Nuwan Upekshana](https://www.linkedin.com/in/nuwan-upekshana)
