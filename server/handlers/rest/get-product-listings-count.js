import {HTTP_GET_METHOD, callShopifyRestAPI} from '../client';

export const getProductListingsCount = async (shop, token) => {
  const resp = await callShopifyRestAPI(
    shop,
    token,
    HTTP_GET_METHOD,
    'product_listings/count',
  );

  return resp.body.count;
};
