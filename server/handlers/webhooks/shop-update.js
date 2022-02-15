import db from '../../../models';

export const handleShopUpdate = async (shop, body) => {
  const {name} = JSON.parse(body);

  const dbShop = await db.Shop.findOne({where: {domain: shop}});

  if (!dbShop) return;

  if (dbShop.name !== name) {
    dbShop.name = name;
  }

  dbShop.save();
};
