<h1 align="center">Shopify Merchant-Facing Channel App</h1>

<p align="center">
    <a href="https://github.com/Shopify/shopify-marketplaces-admin-app/releases">
    <img src="https://img.shields.io/github/issues/Shopify/shopify-marketplaces-admin-app/total?style=for-the-badge&logo=Shopify">
  </a>
  <a href="https://github.com/Shopify/shopify-marketplaces-admin-app/issues&color=brightgreen">
    <img src="https://img.shields.io/github/stars/Shopify/shopify-marketplaces-admin-app?style=for-the-badge&logo=Shopify">
    </a>

This is a Node App with Express and React. It is to be used as a starting point for a merchant facing channel app for marketplaces. This repo makes use of [Shopify CLI](https://shopify.dev/apps/tools/cli) commands to help setup your app quickly and easily.

---

- [1. Getting Started](#1-getting-started)
- [2. Overview of Code Structure](#2-overview-of-code-structure)
- [3. How to use this repo](#3-how-to-use-this-repo)
- [4. Key Tech](#4-key-tech)
- [5. License](#5-license)

---

## 1. Getting Started

**Requirements:**

- [Yarn](https://yarnpkg.com/en/)
- [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli) installed on your system
- [Shopify CLI](https://github.com/Shopify/shopify-cli) installed and [configured for local development](https://shopify.dev/apps/tools/cli/getting-started#4-start-a-local-development-server) (version >= 2.16.1)

To set up for first time

**Clone this repository:**

```bash
git clone https://github.com/Shopify/shopify-marketplaces-admin-app
```

**Install dependencies:**

```bash
yarn
```

**Run migrations:**

```bash
npx sequelize-cli db:migrate
```

**Add scopes:**

Create a .env file in the root folder
Add the following scopes to .env file `unauthenticated_read_product_listings,read_product_listings`.
Your .env file should look like the following:

```bash
SCOPES=unauthenticated_read_product_listings,read_product_listings
```

**Run and install app:**

To run this in dev:

```bash
shopify app serve
```

This will walk you through a series of steps to setup the app in your development store.

To run in production:

```bash
yarn build
yarn start
```


## 2. Overview of Code Structure

Familiarize yourself with the code structure for the merchant-facing channel app, to help you add all additional features that will be required, it is a great way to get started! The file structure follows that of [Shopify CLI](https://shopify.dev/apps/tools/cli). We highly recommend familiarizing yourself with the Shopify CLI and [Channels UI](https://github.com/Shopify/channels-ui-docs). A description of the code for this app can be found on the [Marketplace Kit docs](https://shopify.dev/marketplaces/getting-started/get-started-with-shopify-marketplace-kit).

Familiarize yourself with the code structure for the merchant-facing app, to help orient you to subsequent Marketplace Kit tutorials.

<table>
  <caption>Code structure</caption>
  <tr>
    <th scope="col">Folder/file</th>
    <th scope="col">Contains</th>
  </tr>
  <tr scope="row">
    <td><code>app/*</code></td>
    <td>React code for the frontend, which the merchant sees in the Shopify admin</td>
  </tr>
  <tr scope="row">
    <td><code>server/index.js</code></td>
    <td>The setup for the app's Express server, the Shopify API library, and the Apollo GraphQL server</td>
  </tr>
  <tr scope="row">
    <td><code>server/custom-session-storage.js</code></td>
    <td>Custom session storage functions to store data in the database.You might need to edit this for the database that you're using</td>
  </tr>
  <tr scope="row">
    <td><code>server/handlers/*</code></td>
    <td>Helper functions for making REST and GraphQL calls to Shopify, so that you can do things like create Storefront Access Tokens. Also includes callback functions that are called when the app receives a webhook from Shopify</td>
  </tr>
  <tr scope="row">
    <td><code>server/helpers.js</code></td>
    <td>Helper and wrapper functions that call functions in the <code>handlers</code> folder</td>
  </tr>
  <tr scope="row">
    <td><code>webpack.config.js</code></td>
    <td>The configuration for webpack, which is the app's module bundler. You might need to edit this file depending on your needs for development and production</td>
  </tr>
</table>


## 3. How to use this repo
We have bundled up the code from our tutorials to help you get started building marketplaces quickly. You can use the code in this repo out-of-the-box but we highly recommend familiarizing yourself with the codebase and tutorials so you can have a full understanding of how it works. [Marketplace Kit requirements](https://shopify.dev/marketplaces/getting-started/get-started-with-shopify-marketplace-kit#requirements) is a good starting point and provides explanations for the code. This will make it easier for you to modify and customize your marketplace.

## 4. Key tech

- [`Yarn`](https://classic.yarnpkg.com/en/)
- [`NPM`](https://docs.npmjs.com/getting-started)
- [`Node`](https://nodejs.org/en/download/)
- [`Express`](https://expressjs.com/)
- [`Webpack`](https://webpack.js.org/)
- [`React`](https://reactjs.org/)
- [`Sequelize`](https://sequelize.org/)
- [`Channels UI Library`](https://github.com/Shopify/channels-ui-docs).
- [`GraphQL`](https://graphql.org/) and [REST](https://shopify.dev/api/admin-rest)
- [`Storefront API`](https://shopify.dev/api/storefront)

## 5. License

This repository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
