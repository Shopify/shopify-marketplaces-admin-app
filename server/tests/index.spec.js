/* eslint-disable no-prototype-builtins */
import 'regenerator-runtime/runtime';
import {createTestClient} from 'apollo-server-integration-testing';
import {ApolloServer} from 'apollo-server-express';
import {migrator} from './helpers/umzug';
import {resolvers, schema} from '../graphql/index';
import dotenv from 'dotenv';
import * as constants from './helpers/constants';
import db from '../../models';

dotenv.config();

// Main Queries of GraphQL Endpoint exposed at http://localhost:8081/graphql by default, all argument and fields selected for testing
// Apollo Docs Testing: https://www.apollographql.com/docs/apollo-server/testing/testing/#end-to-end-testing
describe('Running Tests:', () => {
  let useQuery, useMutation;

  beforeAll(async () => {
    try {
      await migrator.up();
      await db.Shop.bulkCreate([constants.SHOP_1, constants.SHOP_2]);
    } catch (err) {
      console.error('Mock DB Initialize, Create and Find Errors', err);
    }

    try {
      const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        bodyparser: true,
        context: async () => {
          return {shop: constants.SHOP_1};
        },
      });
      await apolloServer.start();
      const {query, mutate} = createTestClient({
        apolloServer,
      });
      useQuery = query;
      useMutation = mutate;
    } catch (err) {
      console.error('Initialize Apollo Test Server Error', err);
    }
  });

  describe('Test queries on GraphQL server', () => {
    test('query Shops returns proper response', async () => {
      const res = await useQuery(constants.SHOPS);
      expect(res['data'].hasOwnProperty('shops')).toBe(true);
      expect(res['data']['shops'][0]).toEqual(constants.SHOP_1);
      expect(res['data']['shops'][1]).toEqual(constants.SHOP_2);
    });

    test('query Shop by id for the entire list fetched', async () => {
      const res = await useQuery(constants.SHOP, {
        variables: {
          shopId: 1,
        },
      });
      expect(res['data'].hasOwnProperty('shop')).toBe(true);
      expect(res['data']['shop']).toEqual(constants.SHOP_1);
    });

    test('query ShopCountries', async () => {
      const res = await useQuery(constants.SHOP_COUNTRIES);
      expect(res['data'].hasOwnProperty('shopCountries')).toBe(true);
      expect(res['data']['shopCountries']).toEqual(constants.COUNTRIES);
    });
  });

  describe('Test mutations on GraphQL server', () => {
    test('mutation acceptTerms', async () => {
      const res = await useMutation(constants.ACCEPT_TERMS, {
        variables: constants.SHOP_1,
      });
      expect(res['data']['acceptTerms']['termsAccepted']).toBe(true);
    });

    test('mutation completeOnboardingInfo', async () => {
      const res = await useMutation(constants.COMPLETE_ONBOARDING_INFO, {
        variables: constants.SHOP_1,
      });
      expect(
        res['data']['completeOnboardingInfo']['onboardingInfoCompleted'],
      ).toBe(true);
    });

    test('mutation completeOnboarding', async () => {
      const res = await useMutation(constants.COMPLETE_ONBOARDING, {
        variables: constants.SHOP_1,
      });
      expect(res['data']['completeOnboarding']['onboardingCompleted']).toBe(
        true,
      );
    });
  });

  afterAll(async () => {
    await migrator.down({to: 0});
  });
});
