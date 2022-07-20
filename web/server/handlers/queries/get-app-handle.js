import {callShopifyGraphqlAPI} from '../client';

const APP_HANDLE = `
  query {
    currentAppInstallation {
      app {
        handle
      }
    }
  }
`;

export const getAppHandle = async (shop, token) => {
  const resp = await callShopifyGraphqlAPI(shop, token, {
    query: APP_HANDLE,
  });

  return resp.body.data.currentAppInstallation.app.handle;
};
