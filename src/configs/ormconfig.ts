import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

const CONNECTION_TYPE = 'postgres';

export default registerAs('ormconfig ', (): DataSourceOptions => {
  return {
    type: CONNECTION_TYPE,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: true,
    entities: ['dist/**/entities/*.entity.js'],
    migrations: ['dist/**/migrations/*.js'],
    migrationsRun: true,
  };
});
