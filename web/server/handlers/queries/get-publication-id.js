import {callShopifyGraphqlAPI} from '../client';
import {parseGid} from '@shopify/admin-graphql-api-utilities';

const PUBLICATION_ID = `
  query {
    currentAppInstallation {
      publication {
        id
      }
    }
  }
`;

export const getPublicationId = async (shop, token) => {
  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: PUBLICATION_ID,
  });
  return parseGid(resp.body.data.currentAppInstallation.publication.id);
};
