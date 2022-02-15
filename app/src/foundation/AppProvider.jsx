import React from 'react';
import {ExtendedAppProvider} from '@shopify/channels-ui';
import {Outlet, useLocation} from 'react-router';
import polarisTranslations from '@shopify/polaris/locales/en.json';
import translations from '@shopify/channels-ui/locales/en.json';
import GraphQLProvider from './GraphQL';
import Link from './Link';

import '@shopify/polaris/dist/styles.css';
import '@shopify/channels-ui/dist/styles.css';
import RoutePropagator from './RoutePropagator';

const AppProvider = () => {
  const {search} = useLocation();

  return (
    <ExtendedAppProvider
      polaris={{i18n: polarisTranslations, linkComponent: Link}}
      i18n={translations}
      config={{
        host: new URLSearchParams(search).get('host'),
        apiKey: API_KEY,
        forceRedirect: true,
      }}
    >
      <GraphQLProvider>
        <Outlet />
        <RoutePropagator />
      </GraphQLProvider>
    </ExtendedAppProvider>
  );
};

export default AppProvider;
