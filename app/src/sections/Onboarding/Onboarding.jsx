import React from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useEffect} from 'react';
import {
  LoadingState,
  OnboardingInfoCard,
  OnboardingTermsCard,
} from './components';
import {OnboardingPage} from '@shopify/channels-ui';
import {useNavigate} from 'react-router-dom';

const ONBOARDING_PAGE_QUERY = gql`
  query OnboardingPageQuery {
    adminShop {
      id
      onboardingInfoCompleted
      termsAccepted
      onboardingCompleted
    }
  }
`;

const COMPLETE_ONBOARDING_MUTATION = gql`
  mutation CompleteOnboarding {
    completeOnboarding {
      id
      onboardingCompleted
    }
  }
`;

const Onboarding = () => {
  const {data, loading} = useQuery(ONBOARDING_PAGE_QUERY);
  const [completeOnboarding, {loading: completeLoading}] = useMutation(
    COMPLETE_ONBOARDING_MUTATION,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.adminShop.onboardingCompleted) {
      navigate('/');
    }
  }, [data]);

  if (loading) {
    return <LoadingState />;
  }

  const handleAction = () => {
    completeOnboarding();
  };

  const {
    adminShop: {onboardingInfoCompleted, termsAccepted},
  } = data;

  return (
    <OnboardingPage
      title="Setup Mockingbird Marketplace"
      breadcrumb={{
        content: 'Back',
        url: '/',
      }}
      action={{
        content: 'Finish',
        loading: completeLoading,
        disabled: !termsAccepted,
        onAction: handleAction,
      }}
    >
      <OnboardingInfoCard
        state={onboardingInfoCompleted ? 'completed' : 'active'}
      />
      <OnboardingTermsCard
        state={
          termsAccepted
            ? 'completed'
            : onboardingInfoCompleted
            ? 'active'
            : 'disabled'
        }
      />
    </OnboardingPage>
  );
};

export default Onboarding;
