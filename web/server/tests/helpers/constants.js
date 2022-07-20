export const SHOP_COUNTRIES = `query Query {
    shopCountries
  }`;

export const SHOPS = `query Query($country: String, $nameIsLike: String, $reverse: Boolean, $domains: [String]) {
    shops(country: $country, nameIsLike: $nameIsLike, reverse: $reverse, domains: $domains) {
      id
      country
      name
      domain
      storefrontAccessToken
    }
  }`;

export const SHOP = `query Query($shopId: Int!) { 
    shop(id: $shopId) {
      id
      country
      domain
      name
      storefrontAccessToken
    }
  }`;

export const ACCEPT_TERMS = `mutation Mutation {
    acceptTerms {
      id
      domain
      onboardingInfoCompleted
      termsAccepted
      onboardingCompleted
    }
  }`;

export const COMPLETE_ONBOARDING_INFO = `mutation Mutation {
    completeOnboardingInfo {
      onboardingCompleted
      termsAccepted
      onboardingInfoCompleted
      domain
      id
    }
  }`;

export const COMPLETE_ONBOARDING = `mutation Mutation {
    completeOnboarding {
      id
      domain
      onboardingInfoCompleted
      termsAccepted
      onboardingCompleted
    }
  }`;

export const COUNTRIES = ['Canada', 'United States'];

export const SHOP_1 = {
  id: '1',
  storefrontAccessToken: '',
  name: 'Store 1',
  domain: 'store1.myshopify.com',
  country: 'Canada',
};

export const SHOP_2 = {
  id: '2',
  storefrontAccessToken: '',
  name: 'Store 2',
  domain: 'store2.myshopify.com',
  country: 'United States',
};
