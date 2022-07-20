import {callShopifyGraphqlAPI} from '../client';

const STOREFRONT_ACCESS_TOKEN_CREATE = `
  mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
    storefrontAccessTokenCreate(input: $input) {
      storefrontAccessToken {
        accessToken
      }
    }
  }
`;

export const createStorefrontAccessToken = async (shop, token) => {
  const input = {
    title: 'your-storefront-access-token-name',
  };

  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: STOREFRONT_ACCESS_TOKEN_CREATE,
    variables: {input},
  });
  return resp.body.data.storefrontAccessTokenCreate.storefrontAccessToken
    .accessToken;
};
