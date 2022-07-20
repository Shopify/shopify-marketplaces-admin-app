import {AuthenticationError} from 'apollo-server-express';
import {Op, QueryTypes} from 'sequelize';
import db, {sequelize} from '../../models';
import {
  getAppHandle,
  getProductListingsCount,
  getPublicationId,
} from '../handlers';

export const resolvers = {
  Query: {
    adminShop: async (_, _args, {shop}) => {
      if (!shop) {
        throw new AuthenticationError('Invalid bearer token');
      }
      const dbShop = await db.Shop.findOne({where: {domain: shop.domain}});
      return {
        ...shop,
        ...dbShop.toJSON(),
      };
    },
    shop: async (_, {id}) => {
      if (id) {
        const shop = db.Shop.findOne({
          where: {
            id,
          },
        });
        return shop;
      }
      return null;
    },
    shops: async (_, args) => {
      const query = {
        where: {},
        order: [['name', args.reverse ? 'DESC' : 'ASC']],
      };

      if (args.nameIsLike) {
        query.where.name = {[Op.like]: '%' + args.nameIsLike + '%'};
      }

      if (args.country) {
        query.where.country = args.country;
      }

      if (args.domains) {
        query.where.domain = {[Op.in]: args.domains};
      }

      const shops = await db.Shop.findAll(query);

      return shops;
    },
    shopCountries: async () => {
      const countries = await sequelize.query(
        'SELECT DISTINCT(`country`) FROM `Shops`',
        {type: QueryTypes.SELECT},
      );

      return countries.map((object) => object.country);
    },
  },
  AdminShop: {
    appHandle: async ({domain, accessToken}) => {
      const appHandle = await getAppHandle(domain, accessToken);
      return appHandle;
    },
    publicationId: async ({domain, accessToken}) => {
      const publicationId = await getPublicationId(domain, accessToken);
      return publicationId;
    },
    availableProductCount: async ({domain, accessToken}) => {
      const productListingCount = await getProductListingsCount(
        domain,
        accessToken,
      );
      return productListingCount;
    },
  },
  Mutation: {
    completeOnboardingInfo: async (_, _args, {shop}) => {
      try {
        const {domain} = shop;
        await db.Shop.update(
          {onboardingInfoCompleted: true},
          {where: {domain}},
        );
        const dbShop = await db.Shop.findOne({where: {domain}});
        return {
          ...shop,
          ...dbShop.toJSON(),
        };
      } catch (err) {
        console.error('Failed to update shop in db', err);
      }
    },
    acceptTerms: async (_, _args, {shop}) => {
      try {
        const {domain} = shop;
        await db.Shop.update({termsAccepted: true}, {where: {domain}});
        const dbShop = await db.Shop.findOne({where: {domain}});
        return {
          ...shop,
          ...dbShop.toJSON(),
        };
      } catch (err) {
        console.error('Failed to update shop in db', err);
      }
    },
    completeOnboarding: async (_, _args, {shop}) => {
      try {
        await db.Shop.update(
          {onboardingCompleted: true},
          {where: {domain: shop.domain}},
        );
        const dbShop = await db.Shop.findOne({where: {domain: shop.domain}});
        return {
          ...shop,
          ...dbShop.toJSON(),
        };
      } catch (err) {
        console.error('Failed to update shop in db', err);
      }
    },
  },
};
