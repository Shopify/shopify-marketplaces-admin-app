import {Shopify} from '@shopify/shopify-api';
import {handleAppUninstall} from './app-uninstall';
import {handleShopUpdate} from './shop-update';

const APP_UNINSTALLED = 'APP_UNINSTALLED';
const SHOP_UPDATE = 'SHOP_UPDATE';

export const addWebhookHandlers = () => {
  Shopify.Webhooks.Registry.addHandler(APP_UNINSTALLED, {
    path: '/webhooks',
    webhookHandler: async (topic, shop) => await handleAppUninstall(shop),
  });

  Shopify.Webhooks.Registry.addHandler(SHOP_UPDATE, {
    path: '/webhooks',
    webhookHandler: async (topic, shop, body) =>
      await handleShopUpdate(shop, body),
  });
};

export const registerWebhooks = async (shop, accessToken) => {
  const registerAllResponse = await Shopify.Webhooks.Registry.registerAll({
    shop,
    accessToken,
  });

  Object.keys(registerAllResponse).forEach((key) => {
    if (!registerAllResponse[key].success) {
      console.log(
        `Failed to register ${key} webhook: ${registerAllResponse[key].result}`,
      );
    }
  });
};
