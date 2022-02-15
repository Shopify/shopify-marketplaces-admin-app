import {Umzug, SequelizeStorage} from 'umzug';
import {Sequelize} from 'sequelize';
import db from '../../../models/index';

export const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
    resolve: ({name, path, context}) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize: db.sequelize}),
});
