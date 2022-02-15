import React, {useState} from 'react';
import {Button, Checkbox, Link, Stack} from '@shopify/polaris';
import {OnboardingCard} from '@shopify/channels-ui';
import {gql, useMutation} from '@apollo/client';

const ACCEPT_TERMS_MUTATION = gql`
  mutation AcceptTerms {
    acceptTerms {
      id
      termsAccepted
    }
  }
`;

const OnboardingTermsCard = ({state}) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [acceptTerms, {loading}] = useMutation(ACCEPT_TERMS_MUTATION);

  const handleCheckboxChange = (checked) => {
    setCheckboxValue(checked);
  };

  const handleButtonClick = () => {
    acceptTerms();
  };

  const tosLink = (
    <Link url="https://www.shopify.com/legal/terms" external>
      Mockingbird Marketplace Terms of Service
    </Link>
  );

  return (
    <OnboardingCard title="Accept the terms of service" state={state} sectioned>
      {state === 'completed' ? (
        <p>You have agreed to the {tosLink}.</p>
      ) : (
        <Stack vertical>
          <p>
            In order to complete set up, you need to read and agree to the{' '}
            {tosLink}.
          </p>
          <Checkbox
            label="I accept the terms"
            checked={checkboxValue}
            onChange={handleCheckboxChange}
          />
          <Stack distribution="trailing">
            <Button
              primary
              disabled={!checkboxValue}
              loading={loading}
              onClick={handleButtonClick}
            >
              Accept
            </Button>
          </Stack>
        </Stack>
      )}
    </OnboardingCard>
  );
};

export default OnboardingTermsCard;
