import React from 'react';
import {OnboardingCard, OnboardingInfo} from '@shopify/channels-ui';
import {QuickSaleMajor} from '@shopify/polaris-icons';
import {gql, useMutation} from '@apollo/client';

const COMPLETE_ONBOARDING_INFO_MUTATION = gql`
  mutation CompleteOnboardingInfo {
    completeOnboardingInfo {
      id
      onboardingInfoCompleted
    }
  }
`;

const OnboardingInfoCard = ({state}) => {
  const [completeOnboardingInfo, {loading}] = useMutation(
    COMPLETE_ONBOARDING_INFO_MUTATION,
  );

  const handleAction = () => {
    completeOnboardingInfo();
  };

  return (
    <OnboardingCard
      title="What you need to know before you start"
      state={state}
    >
      <OnboardingInfo
        completed={state === 'completed'}
        items={[
          {
            icon: {
              color: 'subdued',
              source: QuickSaleMajor,
            },
            title:
              'Buyers will be directed to checkout directly from the marketplace',
            content: (
              <p>
                Buyers will be able to purchase your products directly from the
                Mockingbird Marketplace. They will be redirected to your online
                store checkout to complete their purchase.
              </p>
            ),
          },
        ]}
        action={{
          content: 'I understand',
          loading,
          onAction: handleAction,
        }}
      />
    </OnboardingCard>
  );
};

export default OnboardingInfoCard;
