import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: '.db/mydatabase.sqlite3',
  autoLoadModels: true,
  synchronize: true,
};