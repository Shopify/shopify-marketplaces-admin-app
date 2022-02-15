import React, {useEffect} from 'react';
import {SettingsPage} from '@shopify/channels-ui';
import {Card, Link} from '@shopify/polaris';
import {useAppBridge} from '@shopify/app-bridge-react';
import {AppLink, ChannelMenu} from '@shopify/app-bridge/actions';
import {gql, useQuery} from '@apollo/client';
import {useNavigate} from 'react-router-dom';

const SETTINGS_PAGE_QUERY = gql`
  query OnboardingPageQuery {
    adminShop {
      id
      onboardingCompleted
    }
  }
`;

const Settings = () => {
  const {data} = useQuery(SETTINGS_PAGE_QUERY);
  const app = useAppBridge();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !data.adminShop.onboardingCompleted) {
      navigate('/');
    }
  }, [data]);

  const overviewLink = AppLink.create(app, {
    label: 'Overview',
    destination: '/',
  });
  const settingsLink = AppLink.create(app, {
    label: 'Settings',
    destination: '/settings',
  });
  ChannelMenu.create(app, {
    items: [overviewLink, settingsLink],
    active: settingsLink,
  });

  return (
    <SettingsPage title="Settings">
      <SettingsPage.Section
        title="Terms and conditions"
        description="You can view the Mockingbird Marketplace terms and conditions here at any time."
      >
        <Card sectioned>
          <p>
            You have agreed to the{' '}
            <Link url="https://www.shopify.com/legal/terms" external>
              Mockingbird Marketplace Terms of Service
            </Link>
            .
          </p>
        </Card>
      </SettingsPage.Section>
    </SettingsPage>
  );
};

export default Settings;
