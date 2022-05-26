import {ApolloServer} from 'apollo-server-express';
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import {Shopify, ApiVersion} from '@shopify/shopify-api';
import db from '../models';
import webpackConfig from '../webpack.config.js';
import {resolvers, schema} from './graphql';
import {
  addWebhookHandlers,
  getShopDetails,
  registerWebhooks,
} from './handlers/index.js';
import {getOrCreateStorefrontAccessToken} from './helpers';
import CustomSessionStorage from './custom-session-storage';

dotenv.config();

const sessionStorage = new CustomSessionStorage();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(','),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ''),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback,
  ),
});

async function startServer() {
  const app = express();

  const graphQLServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    bodyParser: true,
    context: async (ctx) => {
      const authHeader = ctx.req.headers.authorization;
      const matches = authHeader?.match(/Bearer (.*)/);
      let shop;
      if (matches) {
        const payload = Shopify.Utils.decodeSessionToken(matches[1]);
        shop = payload.dest.replace('https://', '');
      }
      if (shop) {
        const session = await Shopify.Utils.loadOfflineSession(shop);
        if (session) {
          return {shop: {domain: shop, accessToken: session.accessToken}};
        }
      }

      return {};
    },
  });
  await graphQLServer.start();

  graphQLServer.applyMiddleware({
    app,
  });

  addWebhookHandlers();

  // latest version of shopify-cli uses 'login' route vs old version uses 'auth'
  app.get('/:type(login|auth)', async (req, res) => {
    const authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      process.env.SHOP,
      '/auth/callback',
      false,
    );
    return res.redirect(authRoute);
  });

  app.get('/auth/callback', async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query,
      ); // req.query must be cast to unkown and then AuthQuery in order to be accepted

      const {accessToken, shop} = session;

      const storefrontAccessToken = await getOrCreateStorefrontAccessToken(
        shop,
        accessToken,
      );

      const {
        name,
        billingAddress: {country},
      } = await getShopDetails(shop, accessToken);

      const shopData = {
        domain: shop,
        storefrontAccessToken,
        name,
        country,
      };

      try {
        await db.Shop.upsert(shopData);
      } catch (err) {
        console.log('Failed to add shop to db', err);
      }

      await registerWebhooks(shop, accessToken);
    } catch (error) {
      console.error(error); // in practice these should be handled more gracefully
    }
    return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`); // wherever you want your user to end up after OAuth completes
  });

  app.post('/webhooks', async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  app.use(history());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
  } else {
    const compiler = webpack({...webpackConfig, mode: 'development'});
    app.use(
      WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
      }),
    );

    app.use(WebpackHotMiddleware(compiler));
  }

  app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Listening at http://localhost:' + process.env.PORT || 3000);
  });
}

startServer();
