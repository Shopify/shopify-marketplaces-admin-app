import {callShopifyGraphqlAPI} from '../client';

const STOREFRONT_ACCESS_TOKENS = `
  {
    shop {
      storefrontAccessTokens(first: 1) {
        edges {
          node {
            accessToken
          }
        }
      }
    }
  }
`;

export const getStorefrontAccessToken = async (shop, token) => {
  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: STOREFRONT_ACCESS_TOKENS,
  });
  const storefrontAccessTokens =
    resp.body.data.shop.storefrontAccessTokens.edges;
  if (storefrontAccessTokens.length === 0) {
    return null;
  }

  return storefrontAccessTokens[0].node.accessToken;
};
