import {Shopify} from '@shopify/shopify-api';

export const HTTP_GET_METHOD = 'GET';
export const HTTP_POST_METHOD = 'POST';

const createClient = (shop, accessToken) => {
  return new Shopify.Clients.Graphql(shop, accessToken);
};

export const callShopifyGraphqlAPI = async (shop, accessToken, data) => {
  const client = createClient(shop, accessToken);

  return await client.query({
    data,
    extraHeaders: {
      'User-Agent': `shopify-marketplaces-admin-app ${process.env.npm_package_version}`,
    },
  });
};

const createRestClient = (shop, accessToken) => {
  return new Shopify.Clients.Rest(shop, accessToken);
};

export const callShopifyRestAPI = async (
  shop,
  accessToken,
  method,
  path,
  data,
  type,
) => {
  const client = createRestClient(shop, accessToken);

  if (method === HTTP_GET_METHOD) {
    return await client.get({
      path,
      extraHeaders: {
        'User-Agent': `shopify-marketplaces-admin-app ${process.env.npm_package_version}`,
      },
    });
  } else if (method === HTTP_POST_METHOD) {
    return await client.post({
      path,
      data,
      type,
      extraHeaders: {
        'User-Agent': `shopify-marketplaces-admin-app ${process.env.npm_package_version}`,
      },
    });
  }
};
