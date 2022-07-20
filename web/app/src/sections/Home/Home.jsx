import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Introduction, Overview} from './components';
import {Card, SkeletonBodyText, SkeletonPage} from '@shopify/polaris';

const HOME_PAGE_QUERY = gql`
  query HomePageQuery {
    adminShop {
      id
      domain
      appHandle
      publicationId
      availableProductCount
      onboardingInfoCompleted
      onboardingCompleted
    }
  }
`;

const Home = () => {
  const {data, loading} = useQuery(HOME_PAGE_QUERY);
  if (loading) {
    return (
      <SkeletonPage>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </SkeletonPage>
    );
  }

  const {
    adminShop: {
      domain,
      appHandle,
      publicationId,
      availableProductCount,
      onboardingInfoCompleted,
      onboardingCompleted,
    },
  } = data;

  if (onboardingCompleted) {
    return (
      <Overview
        domain={domain}
        availableProductCount={availableProductCount}
        publicationId={publicationId}
        appHandle={appHandle}
      />
    );
  }

  return <Introduction setupInProgress={onboardingInfoCompleted} />;
};

export default Home;
