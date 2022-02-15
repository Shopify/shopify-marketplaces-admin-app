import React from 'react';
import {
  Page,
  Layout,
  Card,
  SkeletonDisplayText,
  SkeletonBodyText,
} from '@shopify/polaris';

const LoadingState = () => {
  return (
    <Page titleHidden narrowWidth>
      <Layout>
        <Layout.Section>
          <SkeletonDisplayText />
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText lines={2} />
          </Card>
          <Card sectioned>
            <SkeletonBodyText lines={2} />
          </Card>
          <Card sectioned>
            <SkeletonBodyText lines={2} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default LoadingState;
