import {FeatureCard, IntroductionPage} from '@shopify/channels-ui';
import DesktopFeature from './images/desktop-feature.png';
import MobileFeature from './images/mobile-feature.png';
import Icon from './images/icon.svg';
import React from 'react';
import {useAppBridge} from '@shopify/app-bridge-react';
import {ChannelMenu} from '@shopify/app-bridge/actions';

const Introduction = ({setupInProgress}) => {
  const app = useAppBridge();
  ChannelMenu.create(app, {
    items: [],
  });

  return (
    <IntroductionPage title="Get started with the Mockingbird channel">
      <FeatureCard
        title="Sell your products on Mockingbird"
        description="Let customers discover your brand and purchase your products directly on the Mockingbird marketplace."
        feature="Mockingbird Marketplace"
        badgeText="Free"
        primaryAction={{
          content: setupInProgress ? 'Continue setup' : 'Start setup',
          url: '/onboarding',
        }}
        portrait
      >
        <div
          style={{
            position: 'relative',
            background:
              'linear-gradient(38.9deg, #DBFAED 15.63%, #43B38E 76.62%)',
            padding: '5% 5% 0',
            display: 'grid',
            gridTemplateAreas: "'image'",
            overflow: 'hidden',
          }}
        >
          <img
            style={{
              width: '80%',
              gridArea: 'image',
              justifySelf: 'center',
              marginTop: '10%',
              marginBottom: '-10%',
            }}
            src={DesktopFeature}
          />
          <img
            style={{
              width: '20%',
              gridArea: 'image',
              justifySelf: 'end',
            }}
            src={MobileFeature}
          />
          <img
            style={{
              gridArea: 'image',
              alignSelf: 'start',
              justifySelf: 'start',
            }}
            src={Icon}
          />
        </div>
      </FeatureCard>
    </IntroductionPage>
  );
};

export default Introduction;
